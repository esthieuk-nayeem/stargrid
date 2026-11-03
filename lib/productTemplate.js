// lib/productTemplate.js
//
// Builds the grouped Excel import template and parses it back on upload.
//
// - buildProductTemplateBlob(config)  -> Blob (.xlsx) with colour-coded groups,
//                                        dropdowns, validation and a field guide.
// - parseProductTemplate(buffer, cfg) -> { rows, errors } ready for bulkUpsertProducts.
//
// `config` is passed in from the page so the template always matches the
// "Add Product" form (same groups, same dropdown lists, same required fields):
//
//   {
//     columns,      // PRODUCT_COLUMNS
//     groups,       // ADD_FORM_CATEGORIES  -> [{ title, fields: [...] }]
//     numericCols,  // NUMERIC_COLS (Set)
//     booleanCols,  // BOOLEAN_COLS (Set)
//     required,     // REQUIRED_FIELDS (Set)
//     hints,        // FIELD_HINTS
//     units,        // FIELD_UNITS
//     dropdowns,    // CATEGORY_DROPDOWNS  -> { col: [options] }
//     multiselect,  // MULTISELECT_FIELDS  -> { col: [options] }
//   }

import * as XLSX from "xlsx";

// bigint columns in the schema — must be whole numbers.
const INTEGER_COLS = new Set([
  "Number_of_Lines",
  "Downtime_Monthly_s",
  "Recovery_Time_Seconds",
  "Incremental_Data_GB",
  "CIR Download_Mbit_s",
  "CIR Upload_Mbit_s",
  "Service_Repair_Time",
  "Min_Contract_Term",
]);

// Percentage columns — must be between 0 and 100.
const PERCENT_COLS = new Set(["Availability_SLA_Percent", "Monthly_%_Fee"]);

const HEADER_ROWS = 2; // row 1 = group bar, row 2 = field names
const FIRST_DATA_ROW = HEADER_ROWS + 1;
const DATA_ROWS = 300; // rows pre-formatted / validated in the template

const GROUP_COLORS = {
  Product: "2F5BD9",
  Costs: "B45309",
  Volume: "0F766E",
  Performance: "7C3AED",
  "Site & Deployment": "BE185D",
  Support: "0369A1",
  "Additional Info": "475569",
};
const FALLBACK_COLORS = ["2F5BD9", "B45309", "0F766E", "7C3AED", "BE185D", "0369A1", "475569"];

const XLSX_MIME = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";

// ── small helpers ───────────────────────────────────────────────────────────

const prettify = (col) => col.replaceAll("_", " ");

// Header matching ignores case, spaces, underscores, "*" and "(units)" so
// "Download Mbit s", "download_mbit_s" and "Download Mbit s\n(Mbit/s)" all match.
function norm(s) {
  return String(s ?? "")
    .toLowerCase()
    .replace(/\([^)]*\)/g, "")
    .replace(/[^a-z0-9%]/g, "");
}

function isBlank(v) {
  return v === null || v === undefined || (typeof v === "string" && v.trim() === "");
}

function tint(hex, amount) {
  const n = parseInt(hex, 16);
  const mix = (c) => Math.round(c + (255 - c) * amount);
  const r = mix((n >> 16) & 255);
  const g = mix((n >> 8) & 255);
  const b = mix(n & 255);
  return [r, g, b].map((v) => v.toString(16).padStart(2, "0")).join("").toUpperCase();
}

function groupColor(title, index) {
  return GROUP_COLORS[title] || FALLBACK_COLORS[index % FALLBACK_COLORS.length];
}

// Groups from the form, limited to real columns; anything left over goes into
// "Additional Info" so no column is ever dropped from the template.
function resolveLayout({ columns, groups }) {
  const colSet = new Set(columns);
  const seen = new Set();
  const out = [];
  const add = (title, fields) => {
    const keys = fields.filter((f) => colSet.has(f) && !seen.has(f));
    keys.forEach((k) => seen.add(k));
    if (keys.length) out.push({ title, fields: keys });
  };
  (groups || []).forEach((g) => add(g.title, g.fields));
  add("Additional Info", columns.filter((c) => !seen.has(c)));
  return out;
}

function fieldKind(col, cfg) {
  if (cfg.multiselect?.[col]) return "multiselect";
  if (cfg.dropdowns?.[col]) return "dropdown";
  if (cfg.booleanCols?.has(col)) return "boolean";
  if (cfg.numericCols?.has(col)) {
    if (INTEGER_COLS.has(col)) return "integer";
    if (PERCENT_COLS.has(col)) return "percent";
    return "number";
  }
  return "text";
}

const KIND_LABEL = {
  text: "Text",
  dropdown: "Dropdown",
  multiselect: "Dropdown / several values",
  boolean: "Yes / No",
  integer: "Whole number",
  number: "Number",
  percent: "Number (0–100)",
};

function allowedText(col, kind, cfg) {
  if (kind === "dropdown") return cfg.dropdowns[col].join(", ");
  if (kind === "multiselect") return cfg.multiselect[col].join(", ") + " (separate several with commas)";
  if (kind === "boolean") return "Yes, No (blank = not specified)";
  if (kind === "integer") return "0 or more, no decimals";
  if (kind === "percent") return "0 to 100";
  if (kind === "number") return "0 or more";
  return "Free text";
}

// ── template builder ────────────────────────────────────────────────────────

export async function buildProductTemplateBlob(cfg) {
  const mod = await import("exceljs");
  const ExcelJS = mod.default ?? mod;

  const layout = resolveLayout(cfg);
  const wb = new ExcelJS.Workbook();
  wb.creator = "Stargrid Product Manager";
  wb.created = new Date();

  const ws = wb.addWorksheet("Products", {
    views: [{ state: "frozen", xSplit: 2, ySplit: HEADER_ROWS, showGridLines: false }],
  });
  const guide = wb.addWorksheet("Instructions", { views: [{ showGridLines: false }] });
  const lists = wb.addWorksheet("Lists", { state: "hidden" });

  const lastDataRow = FIRST_DATA_ROW + DATA_ROWS - 1;
  const white = { argb: "FFFFFFFF" };
  const gridGrey = { argb: "FFD5DBE5" };

  // Dropdown option lists live on the hidden "Lists" sheet (no 255-char limit).
  let listCol = 0;
  const listRange = (col, options) => {
    listCol += 1;
    const letter = lists.getColumn(listCol).letter;
    lists.getCell(1, listCol).value = prettify(col);
    options.forEach((opt, i) => {
      lists.getCell(i + 2, listCol).value = opt;
    });
    return `Lists!$${letter}$2:$${letter}$${options.length + 1}`;
  };

  let c = 0;
  const guideRows = [];

  layout.forEach((group, gi) => {
    const hex = groupColor(group.title, gi);
    const startCol = c + 1;

    group.fields.forEach((col, i) => {
      c += 1;
      const isFirst = i === 0;
      const kind = fieldKind(col, cfg);
      const isReq = cfg.required?.has(col);
      const unit = cfg.units?.[col];
      const letter = ws.getColumn(c).letter;

      // Field header (row 2)
      const head = ws.getCell(HEADER_ROWS, c);
      head.value = `${prettify(col)}${isReq ? " *" : ""}${unit ? `\n(${unit})` : ""}`;
      head.font = { bold: true, size: 10, color: { argb: "FF1F2937" } };
      head.fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FF" + tint(hex, 0.86) } };
      head.alignment = { horizontal: "center", vertical: "middle", wrapText: true };
      head.border = {
        top: { style: "thin", color: white },
        bottom: { style: "medium", color: { argb: "FF" + hex } },
        left: isFirst ? { style: "medium", color: white } : { style: "thin", color: white },
        right: { style: "thin", color: white },
      };
      const note = [cfg.hints?.[col], `Allowed: ${allowedText(col, kind, cfg)}`].filter(Boolean).join("\n\n");
      head.note = note;

      // Column width
      const longest = Math.max(...prettify(col).split(" ").map((w) => w.length), 10);
      const labelWidth = Math.ceil(prettify(col).length * 0.95);
      ws.getColumn(c).width = Math.min(Math.max(labelWidth, longest + 2, kind === "text" ? 18 : 14), 30);

      // Pre-formatted entry cells
      for (let r = FIRST_DATA_ROW; r <= lastDataRow; r += 1) {
        const cell = ws.getCell(r, c);
        cell.border = {
          top: { style: "thin", color: gridGrey },
          bottom: { style: "thin", color: gridGrey },
          right: { style: "thin", color: gridGrey },
          left: isFirst ? { style: "medium", color: { argb: "FF" + hex } } : { style: "thin", color: gridGrey },
        };
        cell.alignment = { vertical: "middle", wrapText: kind === "text" || kind === "multiselect" };
      }

      // Validation
      const range = `${letter}${FIRST_DATA_ROW}:${letter}${lastDataRow}`;
      const label = prettify(col);
      if (kind === "dropdown") {
        ws.dataValidations.add(range, {
          type: "list",
          allowBlank: true,
          formulae: [listRange(col, cfg.dropdowns[col])],
          showErrorMessage: true,
          errorStyle: "stop",
          errorTitle: label,
          error: "Please pick a value from the dropdown list.",
        });
      } else if (kind === "multiselect") {
        ws.dataValidations.add(range, {
          type: "list",
          allowBlank: true,
          formulae: [listRange(col, cfg.multiselect[col])],
          showErrorMessage: false, // free typing allowed so several values can be entered
          showInputMessage: true,
          promptTitle: label,
          prompt: "Pick one, or type several separated by commas (e.g. Maritime, Harsh).",
        });
      } else if (kind === "boolean") {
        ws.dataValidations.add(range, {
          type: "list",
          allowBlank: true,
          formulae: ['"Yes,No"'],
          showErrorMessage: true,
          errorStyle: "stop",
          errorTitle: label,
          error: "Please choose Yes or No.",
        });
      } else if (kind === "integer") {
        ws.dataValidations.add(range, {
          type: "whole",
          operator: "greaterThanOrEqual",
          formulae: [0],
          allowBlank: true,
          showErrorMessage: true,
          errorStyle: "stop",
          errorTitle: label,
          error: "Please enter a whole number (0 or more).",
        });
      } else if (kind === "percent") {
        ws.dataValidations.add(range, {
          type: "decimal",
          operator: "between",
          formulae: [0, 100],
          allowBlank: true,
          showErrorMessage: true,
          errorStyle: "stop",
          errorTitle: label,
          error: "Please enter a number between 0 and 100.",
        });
      } else if (kind === "number") {
        ws.dataValidations.add(range, {
          type: "decimal",
          operator: "greaterThanOrEqual",
          formulae: [0],
          allowBlank: true,
          showErrorMessage: true,
          errorStyle: "stop",
          errorTitle: label,
          error: "Please enter a number (0 or more) — digits only, no units or currency symbols.",
        });
      }

      guideRows.push({
        group: group.title,
        hex,
        field: label + (isReq ? " *" : ""),
        required: isReq ? "Yes" : "",
        type: KIND_LABEL[kind],
        allowed: allowedText(col, kind, cfg),
        description: [cfg.hints?.[col], unit ? `Unit: ${unit}` : ""].filter(Boolean).join(" — "),
      });
    });

    // Group bar (row 1)
    const endCol = c;
    for (let k = startCol; k <= endCol; k += 1) {
      const cell = ws.getCell(1, k);
      cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FF" + hex } };
      cell.border = {
        left: k === startCol ? { style: "medium", color: white } : undefined,
      };
    }
    if (endCol > startCol) ws.mergeCells(1, startCol, 1, endCol);
    const bar = ws.getCell(1, startCol);
    // Narrow groups (e.g. a single column) get a title-only label so it never gets clipped.
    let groupWidth = 0;
    for (let k = startCol; k <= endCol; k += 1) groupWidth += ws.getColumn(k).width || 10;
    const countText = `  ·  ${group.fields.length} field${group.fields.length === 1 ? "" : "s"}`;
    bar.value =
      groupWidth >= (group.title.length + countText.length) * 1.15
        ? group.title.toUpperCase() + countText
        : group.title.toUpperCase();
    bar.font = { bold: true, size: 11, color: white };
    bar.alignment = { horizontal: "center", vertical: "middle", shrinkToFit: true };
    bar.fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FF" + hex } };
  });

  ws.getRow(1).height = 26;
  ws.getRow(2).height = 46;

  // ── Instructions sheet ────────────────────────────────────────────────────
  const widths = [24, 30, 10, 22, 46, 64];
  widths.forEach((w, i) => (guide.getColumn(i + 1).width = w));

  const title = guide.getCell("A1");
  guide.mergeCells("A1:F1");
  title.value = "Stargrid Product Import Template";
  title.font = { bold: true, size: 18, color: { argb: "FF111827" } };
  title.alignment = { vertical: "middle" };
  guide.getRow(1).height = 32;

  const steps = [
    "How to use this template",
    "1.  Go to the “Products” sheet and fill in one product per row, starting at row 3.",
    "2.  Columns are grouped by category (coloured bar on top) — the same groups as the Add Product form.",
    "3.  Fields marked * are required. Hover a field name to see what it means and what is allowed.",
    "4.  Use the dropdowns where available. Environment Suitability also accepts several values separated by commas.",
    "5.  Numbers: digits only (decimal point or comma is fine) — no units, currency symbols or thousand separators.",
    "6.  Site Fixed / Moving / Portable: choose Yes or No. Leave blank if not specified.",
    "7.  Every filled row is added as a new product. Don’t rename the headers; columns may be reordered.",
    "8.  Save the file and use UPLOAD Excel. If any row has a problem, nothing is imported and the problems are listed with their row numbers.",
  ];
  steps.forEach((text, i) => {
    const r = i + 3;
    guide.mergeCells(r, 1, r, 6);
    const cell = guide.getCell(r, 1);
    cell.value = text;
    cell.alignment = { vertical: "middle", wrapText: true };
    if (i === 0) {
      cell.font = { bold: true, size: 12, color: { argb: "FF111827" } };
      guide.getRow(r).height = 24;
    } else {
      cell.font = { size: 11, color: { argb: "FF374151" } };
      guide.getRow(r).height = text.length > 130 ? 34 : 22;
    }
  });

  const guideStart = steps.length + 5;
  const guideTitle = guide.getCell(guideStart - 1, 1);
  guide.mergeCells(guideStart - 1, 1, guideStart - 1, 6);
  guideTitle.value = "Field guide";
  guideTitle.font = { bold: true, size: 12, color: { argb: "FF111827" } };
  guide.getRow(guideStart - 1).height = 24;

  ["Group", "Field", "Required", "Type", "Allowed values / format", "What it means"].forEach((h, i) => {
    const cell = guide.getCell(guideStart, i + 1);
    cell.value = h;
    cell.font = { bold: true, size: 10, color: white };
    cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FF1F2937" } };
    cell.alignment = { vertical: "middle", horizontal: i === 2 ? "center" : "left", indent: 1 };
  });
  guide.getRow(guideStart).height = 22;

  guideRows.forEach((g, i) => {
    const r = guideStart + 1 + i;
    const vals = [g.group, g.field, g.required, g.type, g.allowed, g.description];
    vals.forEach((v, k) => {
      const cell = guide.getCell(r, k + 1);
      cell.value = v;
      cell.alignment = { vertical: "top", wrapText: true, horizontal: k === 2 ? "center" : "left", indent: 1 };
      cell.font = { size: 10, color: { argb: "FF1F2937" }, bold: k === 1 };
      cell.border = { bottom: { style: "thin", color: gridGrey } };
      if (k === 0) {
        cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FF" + tint(g.hex, 0.86) } };
        cell.font = { size: 10, bold: true, color: { argb: "FF" + g.hex } };
      }
    });
    const lines = Math.max(Math.ceil(g.allowed.length / 46), Math.ceil(g.description.length / 66), 1);
    guide.getRow(r).height = Math.max(20, lines * 14 + 6);
  });

  const buf = await wb.xlsx.writeBuffer();
  return new Blob([buf], { type: XLSX_MIME });
}

// ── upload parser ───────────────────────────────────────────────────────────

const TRUE_SET = new Set(["true", "yes", "y", "1", "x", "si", "sí"]);
const FALSE_SET = new Set(["false", "no", "n", "0"]);

function parseNumber(v) {
  if (typeof v === "number") return Number.isFinite(v) ? v : NaN;
  let s = String(v).trim().replace(/[\s€%]/g, "");
  if (/^-?\d+,\d{3}$/.test(s)) return NaN; // "1,000" is ambiguous — ask for plain digits
  if (/^-?\d+,\d+$/.test(s)) s = s.replace(",", "."); // European decimal comma
  if (!/^-?\d*\.?\d+(e[+-]?\d+)?$/i.test(s)) return NaN;
  return Number(s);
}

function parseBool(v) {
  if (typeof v === "boolean") return v;
  if (typeof v === "number") return v === 1 ? true : v === 0 ? false : undefined;
  const s = String(v).trim().toLowerCase();
  if (TRUE_SET.has(s)) return true;
  if (FALSE_SET.has(s)) return false;
  return undefined;
}

function matchOption(value, options) {
  const s = String(value).trim().toLowerCase();
  return options.find((o) => o.toLowerCase() === s);
}

export function parseProductTemplate(arrayBuffer, cfg) {
  const errors = [];
  const wb = XLSX.read(arrayBuffer, { type: "array" });
  const sheetName = wb.SheetNames.find((n) => n.trim().toLowerCase() === "products") || wb.SheetNames[0];
  const ws = wb.Sheets[sheetName];
  if (!ws || !ws["!ref"]) {
    return { rows: [], errors: ["The file is empty."] };
  }

  const range = XLSX.utils.decode_range(ws["!ref"]);
  const grid = XLSX.utils.sheet_to_json(ws, { header: 1, defval: "", raw: true, blankrows: true });

  // header text -> column key
  const aliases = {};
  cfg.columns.forEach((col) => {
    aliases[norm(col)] = col;
    aliases[norm(prettify(col))] = col;
  });

  // The header row is the row (in the first 20) that matches the most known fields.
  let headerIdx = -1;
  let best = 0;
  for (let i = 0; i < Math.min(grid.length, 20); i += 1) {
    const hits = grid[i].filter((cell) => aliases[norm(cell)]).length;
    if (hits > best) {
      best = hits;
      headerIdx = i;
    }
  }
  if (headerIdx === -1 || best < 3) {
    return { rows: [], errors: ["Couldn’t find the column headers. Please use the downloaded template."] };
  }

  const colIndex = {}; // key -> column position
  grid[headerIdx].forEach((cell, j) => {
    const key = aliases[norm(cell)];
    if (key && !(key in colIndex)) colIndex[key] = j;
  });

  const missing = [...(cfg.required || [])].filter((k) => cfg.columns.includes(k) && !(k in colIndex));
  if (missing.length) {
    return {
      rows: [],
      errors: [`Missing required column(s): ${missing.map(prettify).join(", ")}. Please use the downloaded template.`],
    };
  }

  const keys = Object.keys(colIndex);
  const rows = [];

  for (let i = headerIdx + 1; i < grid.length; i += 1) {
    const raw = grid[i];
    if (keys.every((k) => isBlank(raw[colIndex[k]]))) continue; // empty row

    const excelRow = range.s.r + i + 1;
    const out = {};
    const rowErrors = [];

    keys.forEach((col) => {
      const v = raw[colIndex[col]];
      const label = prettify(col);
      const kind = fieldKind(col, cfg);

      if (isBlank(v)) {
        out[col] = null;
        return;
      }

      if (kind === "dropdown") {
        const hit = matchOption(v, cfg.dropdowns[col]);
        if (hit) out[col] = hit;
        else rowErrors.push(`${label}: “${String(v).trim()}” is not in the dropdown list`);
      } else if (kind === "multiselect") {
        const parts = String(v).split(/[,;/]/).map((p) => p.trim()).filter(Boolean);
        const hits = [];
        parts.forEach((p) => {
          const hit = matchOption(p, cfg.multiselect[col]);
          if (hit) {
            if (!hits.includes(hit)) hits.push(hit);
          } else rowErrors.push(`${label}: “${p}” is not a valid option`);
        });
        out[col] = hits.length ? hits.join(", ") : null;
      } else if (kind === "boolean") {
        const b = parseBool(v);
        if (b === undefined) rowErrors.push(`${label}: “${String(v).trim()}” should be Yes or No`);
        else out[col] = b;
      } else if (kind === "text") {
        out[col] = String(v).trim();
      } else {
        const n = parseNumber(v);
        if (Number.isNaN(n)) rowErrors.push(`${label}: “${String(v).trim()}” is not a valid number`);
        else if (n < 0) rowErrors.push(`${label}: can’t be negative`);
        else if (kind === "integer" && !Number.isInteger(n)) rowErrors.push(`${label}: must be a whole number`);
        else if (kind === "percent" && n > 100) rowErrors.push(`${label}: must be between 0 and 100`);
        else out[col] = n;
      }
    });

    (cfg.required || new Set()).forEach((col) => {
      if (col in colIndex && isBlank(out[col]) && !rowErrors.some((e) => e.startsWith(prettify(col)))) {
        rowErrors.push(`${prettify(col)} is required`);
      }
    });

    if (rowErrors.length) rowErrors.forEach((e) => errors.push(`Row ${excelRow}: ${e}`));
    else rows.push(out);
  }

  return { rows, errors };
}

// Short, banner-friendly summary of the first few problems.
export function formatTemplateErrors(errors, max = 5) {
  const shown = errors.slice(0, max).join("  •  ");
  const more = errors.length > max ? `  •  …and ${errors.length - max} more` : "";
  return `${errors.length} problem${errors.length === 1 ? "" : "s"} found, nothing was imported. ${shown}${more}`;
}