// lib/productApi.js
// CRUD helpers for the stargrid_product_table in Supabase.

import { supabase } from "./supabase";

const TABLE = "stargrid_product_table";

/**
 * Whitelist of editable columns — protects against extra/unknown keys
 * accidentally being inserted from the Excel upload.
 */
export const PRODUCT_COLUMNS = [
  "Product_Name",
  "Monthly_Data_GB",
  "Product_Category",
  "Connectivity_Technology",
  "Latency_Class_ms",
  "Max_Throughput_Mbps",
  "Availability_SLA_Percent",
  "Failover_Time_Seconds",
  "Supported_Role",
  "Environment_Suitability",
  "Power_Profile",
  "Provider",
  "Download_Mbit_s",
  "Upload_Mbit_s",
  "Region",
  "Network_Setup_Fee",
  "Network_Monthly_Fee",
  "Teliphonica_Charge_per_MB",
  "Site_Fixed",
  "Site_Moving",
  "Site_Portable",
  "View_Name",
];

export async function fetchAllProducts() {
  const { data, error } = await supabase
    .from(TABLE)
    .select("*")
    .order("id", { ascending: true });
  if (error) throw error;
  return data || [];
}

export async function createProduct(row) {
  const sanitized = sanitizeRow(row);
  const { data, error } = await supabase
    .from(TABLE)
    .insert([sanitized])
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function updateProduct(id, updates) {
  const sanitized = sanitizeRow(updates);
  const { data, error } = await supabase
    .from(TABLE)
    .update(sanitized)
    .eq("id", id)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function deleteProduct(id) {
  const { error } = await supabase.from(TABLE).delete().eq("id", id);
  if (error) throw error;
}

/**
 * Upserts an array of rows. Rows that already have an `id` are updated;
 * rows without an `id` (e.g. from a fresh Excel import) are inserted.
 * Returns the number of upserted rows.
 */
export async function bulkUpsertProducts(rows) {
  if (!rows || rows.length === 0) return 0;
  const sanitized = rows.map(sanitizeRow);

  const { data, error } = await supabase
    .from(TABLE)
    .upsert(sanitized, { onConflict: "id" })
    .select();

  if (error) throw error;
  return data?.length || 0;
}

// ── helpers ────────────────────────────────────────────────────────────────

function sanitizeRow(row) {
  const out = {};
  for (const col of PRODUCT_COLUMNS) {
    if (col in row) {
      out[col] = normalizeValue(col, row[col]);
    }
  }
  return out;
}

function normalizeValue(col, val) {
  if (val === undefined || val === null || val === "") return null;

  // Booleans for the Site_* columns
  if (col === "Site_Fixed" || col === "Site_Moving" || col === "Site_Portable") {
    if (typeof val === "boolean") return val;
    const s = String(val).toLowerCase().trim();
    if (["true", "1", "yes", "y"].includes(s)) return true;
    if (["false", "0", "no", "n"].includes(s)) return false;
    return null;
  }

  // Numeric columns
  const numericCols = [
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
  ];
  if (numericCols.includes(col)) {
    const n = Number(val);
    return Number.isFinite(n) ? n : null;
  }

  return String(val);
}
