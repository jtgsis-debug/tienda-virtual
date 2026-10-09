export const SUPABASE_URL =
  process.env.NEXT_PUBLIC_SUPABASE_URL || "https://yunskddgdtwlfrlvsbud.supabase.co";
export const SUPABASE_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_KEY || "sb_publishable_0VgNwuZg5r62P6DOVIxVMg_4zPheQIs";

export const cabeceras = {
  apikey: SUPABASE_KEY,
  Authorization: `Bearer ${SUPABASE_KEY}`,
};
