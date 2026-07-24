"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import {
  fetchAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  bulkUpsertProducts,
  PRODUCT_COLUMNS,
} from "@/lib/productApi";

const NUMERIC_COLS = new Set([
  "Monthly_Data_GB",
  "Latency_Class_ms",
  "Max_Throughput_Mbps",
  "Availability_SLA_Percent",
  "Failover_Time_Seconds",
  "Download_Mbit_s",
  "Upload_Mbit_s",
  "Network_Setup_Fee",
  "Network_Monthly_Fee",
  "Teliphonica_Charge_per_MB",
]);

const BOOLEAN_COLS = new Set(["Site_Fixed", "Site_Moving", "Site_Portable"]);

const FILTER_DEFS = [
  { key: "Product_Category", label: "Category", type: "categorical" },
  { key: "Provider", label: "Provider", type: "categorical" },
  { key: "Region", label: "Region", type: "categorical" },
  { key: "Connectivity_Technology", label: "Connectivity", type: "categorical" },
  { key: "Environment_Suitability", label: "Environment", type: "categorical" },
  { key: "Monthly_Data_GB", label: "Monthly Data (GB)", type: "range" },
  { key: "Download_Mbit_s", label: "Download (Mb/s)", type: "range" },
  { key: "Upload_Mbit_s", label: "Upload (Mb/s)", type: "range" },
  { key: "Network_Setup_Fee", label: "Setup Fee (EUR)", type: "range" },
  { key: "Network_Monthly_Fee", label: "Monthly Fee (EUR)", type: "range" },
];

const EMPTY_FORM = PRODUCT_COLUMNS.reduce((acc, c) => {
  acc[c] = BOOLEAN_COLS.has(c) ? false : NUMERIC_COLS.has(c) ? "" : "";
  return acc;
}, {});

const REQUIRED_FIELDS = new Set([
  "Product_Category",
  "Provider",
  "Region",
  "Connectivity_Technology",
]);

const FIELD_HINTS = {
  Product_Category: "e.g. MPLS, SD-WAN, 4G/5G, Satellite, Broadband",
  Provider: "Vendor / carrier name, e.g. Vodafone, Deutsche Telekom",
  Region: "Country or region served, e.g. Germany, EU, Global",
  Connectivity_Technology: "e.g. Fiber, 5G, LTE, Satellite, DSL",
  Environment_Suitability: "Where it works: Indoor, Outdoor, Maritime, Aerial",
  Monthly_Data_GB: "Monthly data allowance in GB (0 = unlimited)",
  Latency_Class_ms: "Typical latency in milliseconds",
  Max_Throughput_Mbps: "Maximum speed in Mbps",
  Availability_SLA_Percent: "Uptime guarantee, e.g. 99.9",
  Failover_Time_Seconds: "Time to switch to backup link",
  Download_Mbit_s: "Download speed in Mbit/s",
  Upload_Mbit_s: "Upload speed in Mbit/s",
  Network_Setup_Fee: "One-time setup fee in EUR",
  Network_Monthly_Fee: "Recurring monthly fee in EUR",
  Teliphonica_Charge_per_MB: "Per-MB charge if applicable (blank if N/A)",
  Site_Fixed: "True if supported at a fixed/building site",
  Site_Moving: "True if supported on a moving vehicle/vessel",
  Site_Portable: "True if supported as a portable/mobile kit",
  Static_IP_Available: "Whether a static public IP is available",
  Public_IP: "Whether a public IP is included",
  Notes: "Any free-form notes about this product",
};

// Unscoped global CSS so that native <option> elements (rendered outside the
// styled-jsx DOM tree) inherit dark backgrounds and white text.
const GLOBAL_DROPDOWN_CSS = `
  .pm__filter select option,
  .pm__td select option,
  .pm__field select option,
  .pm__addform-grid select option {
    background-color: #1a1f35 !important;
    color: #ffffff !important;
    padding: 10px 14px;
    font-weight: 500;
  }
  .pm__filter select option:checked,
  .pm__td select option:checked,
  .pm__field select option:checked,
  .pm__addform-grid select option:checked {
    background: #3D72FC !important;
    color: #ffffff !important;
  }
  .pm__filter select option:hover,
  .pm__td select option:hover,
  .pm__field select option:hover,
  .pm__addform-grid select option:hover {
    background-color: #2a3050 !important;
  }
  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus,
  select:-webkit-autofill,
  select:-webkit-autofill:hover {
    -webkit-text-fill-color: #ffffff !important;
    -webkit-box-shadow: 0 0 0px 1000px #1a1f35 inset !important;
    caret-color: #ffffff;
  }
`;

function prettifyLabel(col) {
  return col.replaceAll("_", " ");
}

export default function ProductManagerPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [editingId, setEditingId] = useState(null);
  const [editValues, setEditValues] = useState({});
  const [showAddForm, setShowAddForm] = useState(false);
  const [newRow, setNewRow] = useState({ ...EMPTY_FORM });

  const [confirmDeleteId, setConfirmDeleteId] = useState(null);
  const [bulkResult, setBulkResult] = useState(null);
  const [saving, setSaving] = useState(false);

  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState(() =>
    FILTER_DEFS.reduce((acc, f) => {
      if (f.type === "categorical") acc[f.key] = "all";
      if (f.type === "range") acc[f.key] = { min: "", max: "" };
      return acc;
    }, {})
  );

  const fileInputRef = useRef(null);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    try {
      setLoading(true);
      const data = await fetchAllProducts();
      setProducts(data);
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  const facetOptions = useMemo(() => {
    const out = {};
    for (const f of FILTER_DEFS) {
      if (f.type === "categorical") {
        out[f.key] = uniqueSorted(products.map((p) => p[f.key]).filter(Boolean));
      }
    }
    return out;
  }, [products]);

  const filteredProducts = useMemo(() => {
    let rows = products;

    if (search.trim()) {
      const q = search.toLowerCase();
      rows = rows.filter((p) =>
        PRODUCT_COLUMNS.some((c) => String(p[c] ?? "").toLowerCase().includes(q))
      );
    }

    for (const f of FILTER_DEFS) {
      const val = filters[f.key];
      if (f.type === "categorical" && val !== "all") {
        rows = rows.filter((p) => p[f.key] === val);
      }
      if (f.type === "range") {
        const min = val.min === "" ? -Infinity : Number(val.min);
        const max = val.max === "" ? Infinity : Number(val.max);
        rows = rows.filter((p) => {
          const v = Number(p[f.key]);
          if (!Number.isFinite(v)) return true;
          return v >= min && v <= max;
        });
      }
    }
    return rows;
  }, [products, search, filters]);

  function startEdit(row) {
    setEditingId(row.id);
    setEditValues({ ...row });
  }

  function cancelEdit() {
    setEditingId(null);
    setEditValues({});
  }

  async function saveEdit() {
    try {
      setSaving(true);
      const updated = await updateProduct(editingId, editValues);
      setProducts((prev) => prev.map((p) => (p.id === editingId ? updated : p)));
      cancelEdit();
    } catch (err) {
      alert("Update failed: " + err.message);
    } finally {
      setSaving(false);
    }
  }

  function updateEditField(col, value) {
    setEditValues((prev) => ({ ...prev, [col]: value }));
  }

  async function saveNewRow() {
    try {
      setSaving(true);
      const created = await createProduct(newRow);
      setProducts((prev) => [...prev, created]);
      setNewRow({ ...EMPTY_FORM });
      setShowAddForm(false);
    } catch (err) {
      alert("Create failed: " + err.message);
    } finally {
      setSaving(false);
    }
  }

  async function confirmDelete() {
    try {
      setSaving(true);
      await deleteProduct(confirmDeleteId);
      setProducts((prev) => prev.filter((p) => p.id !== confirmDeleteId));
      setConfirmDeleteId(null);
    } catch (err) {
      alert("Delete failed: " + err.message);
    } finally {
      setSaving(false);
    }
  }

  function downloadTemplate() {
    const sample = PRODUCT_COLUMNS.reduce((acc, c) => {
      if (NUMERIC_COLS.has(c)) acc[c] = 0;
      else if (BOOLEAN_COLS.has(c)) acc[c] = false;
      else acc[c] = "";
      return acc;
    }, {});

    const ws = XLSX.utils.json_to_sheet([sample], { header: PRODUCT_COLUMNS });
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Products");

    const instr = XLSX.utils.aoa_to_sheet([
      ["Stargrid Product Import Template"],
      [""],
      ["Instructions:"],
      ["- Leave id blank to insert a new row; fill id to update an existing row."],
      ["- Boolean fields accept: true / false / yes / no / 1 / 0."],
      ["- Numeric fields can be left blank."],
    ]);
    XLSX.utils.book_append_sheet(wb, instr, "Instructions");

    const buf = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    saveAs(new Blob([buf], { type: "application/octet-stream" }), "stargrid_products_template.xlsx");
  }

  async function handleFileUpload(e) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;

    try {
      setSaving(true);
      const buf = await file.arrayBuffer();
      const wb = XLSX.read(buf, { type: "array" });
      const ws = wb.Sheets[wb.SheetNames[0]];
      const rows = XLSX.utils.sheet_to_json(ws, { defval: "" });

      const cleaned = rows.map((r) => {
        const out = { ...r };
        if ("id" in out && out.id !== "" && out.id !== null) {
          const n = Number(out.id);
          if (Number.isFinite(n)) out.id = n;
        }
        return out;
      });

      const count = await bulkUpsertProducts(cleaned);
      await load();
      setBulkResult({ ok: true, count });
    } catch (err) {
      console.error(err);
      setBulkResult({ ok: false, message: err.message });
    } finally {
      setSaving(false);
    }
  }

  if (loading)
    return (
      <div style={centerStyle}>
        <div style={spinnerStyle} />
        <p style={{ color: "rgba(255,255,255,0.6)", marginTop: 16 }}>Loading products...</p>
      </div>
    );

  if (error)
    return (
      <div style={centerStyle}>
        <h2 style={{ color: "#FA5674" }}>Failed to load products</h2>
        <p style={{ color: "rgba(255,255,255,0.6)" }}>{error}</p>
        <button onClick={load} style={primaryBtn}>Retry</button>
      </div>
    );

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: GLOBAL_DROPDOWN_CSS }} />

      <div className="pm">
        <div className="pm__blob1" />
        <div className="pm__blob2" />

        <div className="pm__inner">
          <div className="pm__hdr">
            <div>
              <h1>Stargrid Product Manager</h1>
              <p>{products.length} product{products.length !== 1 ? "s" : ""} in catalog</p>
            </div>
            <div className="pm__hdr-actions">
              <button className="btn-tpl" onClick={downloadTemplate}>DOWNLOAD Template</button>
              <button className="btn-up" onClick={() => fileInputRef.current?.click()}>UPLOAD Excel</button>
              <input
                ref={fileInputRef}
                type="file"
                accept=".xlsx,.xls"
                onChange={handleFileUpload}
                style={{ display: "none" }}
              />
              <button className="btn-add" onClick={() => setShowAddForm((s) => !s)}>
                {showAddForm ? "X Cancel" : "+ Add Product"}
              </button>
            </div>
          </div>

          {bulkResult && (
            <div className={bulkResult.ok ? "pm__banner pm__banner--ok" : "pm__banner pm__banner--err"}>
              {bulkResult.ok
                ? `OK Imported/updated ${bulkResult.count} row(s) successfully.`
                : `FAIL Upload failed: ${bulkResult.message}`}
              <button className="pm__banner-close" onClick={() => setBulkResult(null)}>X</button>
            </div>
          )}

          <div className="pm__filters">
            <div className="pm__filter-search">
              <input
                type="text"
                placeholder="Search across all fields..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            {FILTER_DEFS.map((f) => {
              if (f.type === "categorical") {
                return (
                  <div key={f.key} className="pm__filter">
                    <label>{f.label}</label>
                    <select
                      value={filters[f.key]}
                      onChange={(e) =>
                        setFilters((prev) => ({ ...prev, [f.key]: e.target.value }))
                      }
                    >
                      <option value="all">All</option>
                      {facetOptions[f.key]?.map((opt) => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  </div>
                );
              }
              return (
                <div key={f.key} className="pm__filter pm__filter--range">
                  <label>{f.label}</label>
                  <div className="pm__range">
                    <input
                      type="number"
                      placeholder="min"
                      value={filters[f.key].min}
                      onChange={(e) =>
                        setFilters((prev) => ({
                          ...prev,
                          [f.key]: { ...prev[f.key], min: e.target.value },
                        }))
                      }
                    />
                    <span>-</span>
                    <input
                      type="number"
                      placeholder="max"
                      value={filters[f.key].max}
                      onChange={(e) =>
                        setFilters((prev) => ({
                          ...prev,
                          [f.key]: { ...prev[f.key], max: e.target.value },
                        }))
                      }
                    />
                  </div>
                </div>
              );
            })}

            <button
              className="pm__filter-clear"
              onClick={() => {
                setSearch("");
                setFilters(
                  FILTER_DEFS.reduce((acc, f) => {
                    if (f.type === "categorical") acc[f.key] = "all";
                    if (f.type === "range") acc[f.key] = { min: "", max: "" };
                    return acc;
                  }, {})
                );
              }}
            >
              Clear filters
            </button>
          </div>

          {showAddForm && (
            <div className="pm__addform">
              <h3>New product</h3>
              <p className="pm__addform-hint">
                Fill in the fields below. Required fields are marked with <span className="pm__field-req">*</span>. Hover any field for guidance.
              </p>
              <div className="pm__addform-grid">
                {PRODUCT_COLUMNS.map((col) => {
                  const isReq = REQUIRED_FIELDS.has(col);
                  const hint = FIELD_HINTS[col];
                  return (
                    <div key={col} className="pm__field">
                      <label htmlFor={"new-" + col} className="pm__field-label">
                        {prettifyLabel(col)}
                        {isReq && <span className="pm__field-req">*</span>}
                      </label>
                      <CellEditor
                        col={col}
                        value={newRow[col]}
                        onChange={(v) => setNewRow((prev) => ({ ...prev, [col]: v }))}
                        inputId={"new-" + (col) + ""}
                      />
                      {hint && <small className="pm__field-hint">{hint}</small>}
                    </div>
                  );
                })}
              </div>
              <div className="pm__addform-actions">
                <button onClick={saveNewRow} disabled={saving} className="btn-add">
                  {saving ? "Saving..." : "Save Product"}
                </button>
                <button onClick={() => { setShowAddForm(false); setNewRow({ ...EMPTY_FORM }); }} className="btn-sec">
                  Cancel
                </button>
              </div>
            </div>
          )}

          <div className="pm__tablewrap">
            <table className="pm__table">
              <thead>
                <tr>
                  <th style={{ width: 60 }}>Actions</th>
                  {PRODUCT_COLUMNS.map((c) => (
                    <th key={c} title={FIELD_HINTS[c] || ""}>{prettifyLabel(c)}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredProducts.length === 0 && (
                  <tr>
                    <td colSpan={PRODUCT_COLUMNS.length + 1} style={{ textAlign: "center", padding: 40, color: "rgba(255,255,255,0.4)" }}>
                      No products match your filters.
                    </td>
                  </tr>
                )}

                {filteredProducts.map((row) => {
                  const isEditing = editingId === row.id;
                  return (
                    <tr key={row.id} className={isEditing ? "pm__tr--editing" : ""}>
                      <td>
                        {isEditing ? (
                          <div className="pm__rowact">
                            <button onClick={saveEdit} disabled={saving} title="Save" className="pm__icobtn pm__icobtn--save">OK</button>
                            <button onClick={cancelEdit} title="Cancel" className="pm__icobtn pm__icobtn--cancel">X</button>
                          </div>
                        ) : (
                          <div className="pm__rowact">
                            <button onClick={() => startEdit(row)} title="Edit" className="pm__icobtn">EDIT</button>
                            <button onClick={() => setConfirmDeleteId(row.id)} title="Delete" className="pm__icobtn pm__icobtn--del">DEL</button>
                          </div>
                        )}
                      </td>

                      {PRODUCT_COLUMNS.map((col) => (
                        <td key={col} className="pm__td">
                          {isEditing ? (
                            <CellEditor
                              col={col}
                              value={editValues[col]}
                              onChange={(v) => updateEditField(col, v)}
                              inputId={"edit-" + (row.id) + "-" + (col) + ""}
                            />
                          ) : (
                            <span title={FIELD_HINTS[col] || ""}>{formatCell(row[col])}</span>
                          )}
                        </td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <p className="pm__count">
            Showing {filteredProducts.length} of {products.length} products
          </p>
        </div>

        {confirmDeleteId !== null && (
          <div className="pm__modal-overlay" onClick={() => !saving && setConfirmDeleteId(null)}>
            <div className="pm__modal" onClick={(e) => e.stopPropagation()}>
              <h3>Delete product?</h3>
              <p>
                This will permanently delete product <strong>#{confirmDeleteId}</strong>.
                This action cannot be undone.
              </p>
              <div className="pm__modal-actions">
                <button className="pm__modal-btn pm__modal-btn--del" onClick={confirmDelete} disabled={saving}>
                  {saving ? "Deleting..." : "Delete"}
                </button>
                <button className="pm__modal-btn" onClick={() => setConfirmDeleteId(null)} disabled={saving}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        <style jsx>{`
          .pm { position:relative; min-height:100vh; background:#070c14; padding:48px 18px; overflow:hidden; }
          .pm__blob1 { position:absolute; width:800px; height:800px; border-radius:50%; right:-250px; top:-180px; background:radial-gradient(circle,rgba(22,14,255,0.11) 0%,transparent 70%); pointer-events:none; z-index:0; }
          .pm__blob2 { position:absolute; width:500px; height:500px; border-radius:50%; left:-150px; bottom:-140px; background:radial-gradient(circle,rgba(102,105,216,0.14) 0%,transparent 65%); pointer-events:none; z-index:0; }
          .pm__inner { position:relative; z-index:1; max-width:1500px; margin:0 auto; }

          .pm__hdr { display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:16px; margin-bottom:32px; }
          .pm__hdr h1 { font-size:30px; font-weight:700; color:#fff; margin:0 0 6px; }
          .pm__hdr p { font-size:14px; color:rgba(255,255,255,0.5); margin:0; }
          .pm__hdr-actions { display:flex; gap:10px; flex-wrap:wrap; }

          .btn-tpl,.btn-up,.btn-add,.btn-sec { padding:11px 20px; border:none; border-radius:10px; font-size:14px; font-weight:600; cursor:pointer; transition:all 0.2s; }
          .btn-tpl { background:rgba(255,152,0,0.15); border:1px solid rgba(255,152,0,0.4); color:#FF9800; }
          .btn-tpl:hover { background:rgba(255,152,0,0.25); }
          .btn-up { background:rgba(34,197,94,0.15); border:1px solid rgba(34,197,94,0.4); color:#22c55e; }
          .btn-up:hover { background:rgba(34,197,94,0.25); }
          .btn-add { background:linear-gradient(135deg,#3D72FC,#5CB0E9); color:#fff; }
          .btn-add:hover { transform:translateY(-2px); box-shadow:0 8px 20px rgba(61,114,252,0.4); }
          .btn-sec { background:rgba(255,255,255,0.06); border:1px solid rgba(255,255,255,0.15); color:rgba(255,255,255,0.8); }
          .btn-sec:hover { background:rgba(255,255,255,0.1); }

          .pm__banner { padding:14px 22px; border-radius:12px; margin-bottom:20px; display:flex; justify-content:space-between; align-items:center; font-weight:500; }
          .pm__banner--ok { background:rgba(34,197,94,0.12); border:1px solid rgba(34,197,94,0.35); color:#86efac; }
          .pm__banner--err { background:rgba(250,86,116,0.12); border:1px solid rgba(250,86,116,0.35); color:#FCA5A5; }
          .pm__banner-close { background:none; border:none; color:inherit; font-size:18px; cursor:pointer; padding:0 8px; }

          .pm__filters { display:grid; grid-template-columns:repeat(auto-fit,minmax(180px,1fr)); gap:14px; background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.08); padding:18px; border-radius:16px; margin-bottom:24px; }
          .pm__filter { display:flex; flex-direction:column; gap:6px; }
          .pm__filter label { font-size:11px; color:rgba(255,255,255,0.5); text-transform:uppercase; letter-spacing:0.6px; font-weight:600; }
          .pm__filter select, .pm__filter input, .pm__filter-search input {
            padding:9px 12px; background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.12);
            border-radius:8px; color:#fff; font-size:13px;
            color-scheme: dark;
          }
          .pm__filter select:focus, .pm__filter input:focus, .pm__filter-search input:focus {
            outline:none; border-color:#3D72FC;
          }
          .pm__filter-search { grid-column:1 / -1; }
          .pm__range { display:flex; align-items:center; gap:6px; }
          .pm__range input { width:100%; min-width:0; }
          .pm__range span { color:rgba(255,255,255,0.4); }
          .pm__filter-clear { align-self:end; padding:10px; background:rgba(255,255,255,0.06); border:1px solid rgba(255,255,255,0.12); color:rgba(255,255,255,0.7); border-radius:8px; cursor:pointer; font-size:13px; }
          .pm__filter-clear:hover { background:rgba(255,255,255,0.1); }

          .pm__addform { background:rgba(61,114,252,0.06); border:1px solid rgba(61,114,252,0.35); border-radius:16px; padding:24px; margin-bottom:24px; }
          .pm__addform h3 { margin:0 0 8px; color:#fff; font-size:18px; }
          .pm__addform-hint { margin:0 0 18px; color:rgba(255,255,255,0.55); font-size:13px; line-height:1.5; }
          .pm__addform-grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(220px,1fr)); gap:16px; }

          .pm__field { display:flex; flex-direction:column; gap:6px; }
          .pm__field-label { font-size:11px; color:rgba(255,255,255,0.7); text-transform:uppercase; letter-spacing:0.6px; font-weight:700; display:flex; align-items:center; gap:4px; }
          .pm__field-req { color:#FA5674; font-weight:700; }
          .pm__field-hint { font-size:11px; color:rgba(255,255,255,0.45); line-height:1.4; font-weight:400; text-transform:none; letter-spacing:0; }

          .pm__field select, .pm__field input,
          .pm__addform-grid select, .pm__addform-grid input {
            padding:9px 12px; background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.12);
            border-radius:8px; color:#fff; font-size:13px; width:100%;
            color-scheme: dark;
          }
          .pm__field select:focus, .pm__field input:focus,
          .pm__addform-grid select:focus, .pm__addform-grid input:focus {
            outline:none; border-color:#3D72FC;
          }
          .pm__addform-actions { display:flex; gap:10px; margin-top:18px; }

          .pm__tablewrap { overflow:auto; border-radius:16px; background:rgba(255,255,255,0.025); border:1px solid rgba(255,255,255,0.08); }
          .pm__table { width:100%; border-collapse:collapse; font-size:13px; }
          .pm__table thead { background:rgba(255,255,255,0.05); position:sticky; top:0; z-index:2; }
          .pm__table th { padding:14px 14px; text-align:left; font-size:11px; font-weight:700; color:rgba(255,255,255,0.55); text-transform:uppercase; letter-spacing:0.6px; border-bottom:1px solid rgba(255,255,255,0.08); white-space:nowrap; }
          .pm__table td { padding:12px 14px; color:rgba(255,255,255,0.85); border-bottom:1px solid rgba(255,255,255,0.04); vertical-align:middle; }
          .pm__table tbody tr:hover { background:rgba(255,255,255,0.025); }
          .pm__tr--editing { background:rgba(61,114,252,0.08); }
          .pm__td input, .pm__td select {
            width:100%; padding:7px 10px; background:rgba(255,255,255,0.06);
            border:1px solid rgba(61,114,252,0.4); border-radius:6px;
            color:#fff; font-size:13px; min-width:90px;
            color-scheme: dark;
          }
          .pm__td input:focus, .pm__td select:focus { outline:none; border-color:#5CB0E9; }

          .pm__rowact { display:flex; gap:6px; }
          .pm__icobtn { width:34px; height:30px; border:none; border-radius:8px; background:rgba(255,255,255,0.06); color:#fff; font-size:11px; font-weight:700; cursor:pointer; display:flex; align-items:center; justify-content:center; }
          .pm__icobtn:hover { background:rgba(255,255,255,0.12); }
          .pm__icobtn--save { background:#22c55e; color:#fff; }
          .pm__icobtn--save:hover { background:#16a34a; }
          .pm__icobtn--cancel { background:rgba(255,255,255,0.1); }
          .pm__icobtn--del { background:rgba(250,86,116,0.18); color:#FCA5A5; }
          .pm__icobtn--del:hover { background:rgba(250,86,116,0.35); }

          .pm__count { text-align:center; color:rgba(255,255,255,0.4); font-size:13px; margin-top:18px; }

          .pm__modal-overlay { position:fixed; inset:0; background:rgba(0,0,0,0.7); z-index:1000; display:flex; align-items:center; justify-content:center; padding:20px; }
          .pm__modal { background:#1a1f35; border:1px solid rgba(255,255,255,0.12); border-radius:18px; padding:28px; max-width:440px; width:100%; }
          .pm__modal h3 { font-size:20px; color:#fff; margin:0 0 12px; }
          .pm__modal p { color:rgba(255,255,255,0.7); margin:0 0 22px; font-size:14px; line-height:1.6; }
          .pm__modal-actions { display:flex; gap:10px; justify-content:flex-end; }
          .pm__modal-btn { padding:11px 22px; border:none; border-radius:10px; font-size:14px; font-weight:600; cursor:pointer; }
          .pm__modal-btn--del { background:linear-gradient(135deg,#FA5674,#e63950); color:#fff; }
          .pm__modal-btn:not(.pm__modal-btn--del) { background:rgba(255,255,255,0.08); color:#fff; }
          .pm__modal-btn:hover { background:rgba(255,255,255,0.14); }

          @media(max-width:768px) {
            .pm { padding:28px 12px; }
            .pm__hdr h1 { font-size:22px; }
          }
        `}</style>
      </div>
    </>
  );
}

function CellEditor({ col, value, onChange, inputId }) {
  const hint = FIELD_HINTS[col] || "";
  if (BOOLEAN_COLS.has(col)) {
    return (
      <select id={inputId} value={String(value)} onChange={(e) => onChange(e.target.value === "true")} title={hint}>
        <option value="false">false</option>
        <option value="true">true</option>
      </select>
    );
  }
  if (NUMERIC_COLS.has(col)) {
    return (
      <input
        id={inputId}
        type="number"
        step="any"
        value={value ?? ""}
        title={hint}
        onChange={(e) => onChange(e.target.value === "" ? null : e.target.value)}
      />
    );
  }
  return <input id={inputId} type="text" value={value ?? ""} title={hint} onChange={(e) => onChange(e.target.value)} />;
}

function formatCell(v) {
  if (v === null || v === undefined || v === "") return "-";
  if (typeof v === "boolean") return v ? "Y" : "N";
  if (typeof v === "number") {
    if (Number.isInteger(v)) return v.toString();
    return Number(v).toFixed(2).replace(/\.?0+$/, "");
  }
  return String(v);
}

function uniqueSorted(arr) {
  return [...new Set(arr)].sort((a, b) => String(a).localeCompare(String(b)));
}

const centerStyle = {
  minHeight: "100vh",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  background: "#070c14",
  gap: 16,
  padding: 20,
};

const spinnerStyle = {
  width: 48,
  height: 48,
  border: "4px solid rgba(255,255,255,0.1)",
  borderTopColor: "#3D72FC",
  borderRadius: "50%",
  animation: "spin 0.8s linear infinite",
};

const primaryBtn = {
  padding: "11px 22px",
  background: "linear-gradient(135deg,#3D72FC,#5CB0E9)",
  color: "#fff",
  border: "none",
  borderRadius: 10,
  fontSize: 14,
  fontWeight: 600,
  cursor: "pointer",
  marginTop: 8,
};
