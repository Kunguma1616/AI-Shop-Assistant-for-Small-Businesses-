import { createClient } from "@supabase/supabase-js";

// Debug: Log what we're getting
console.log("🔍 Checking environment variables...");
console.log("URL:", import.meta.env.VITE_SUPABASE_URL);
console.log("Key:", import.meta.env.VITE_SUPABASE_ANON_KEY ? "✅ Found" : "❌ Missing");

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Better error messages
if (!supabaseUrl) {
  console.error("❌ VITE_SUPABASE_URL is missing!");
  console.error("Make sure .env file exists with:");
  console.error("VITE_SUPABASE_URL=https://your-project.supabase.co");
  throw new Error("Missing VITE_SUPABASE_URL in .env file");
}

if (!supabaseAnonKey) {
  console.error("❌ VITE_SUPABASE_ANON_KEY is missing!");
  console.error("Make sure .env file exists with:");
  console.error("VITE_SUPABASE_ANON_KEY=your-anon-key");
  throw new Error("Missing VITE_SUPABASE_ANON_KEY in .env file");
}

console.log("✅ Supabase configured:", supabaseUrl);

export const supabase = createClient(supabaseUrl, supabaseAnonKey);