
const SUPABASE_URL = "https://orzipwxjqxcsqunktmob.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_HNqDkSvMl7VFEbg6K3z5GA_15hBRKXg";

if (!window.supabase) {
    throw new Error(
        "Supabase library not loaded. Check the Supabase CDN script."
    );
}

window.supabaseClient = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_ANON_KEY
);

console.log("HelpHive Supabase client loaded.");
