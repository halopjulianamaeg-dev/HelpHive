```javascript
const SUPABASE_URL = "https://orzipwxjqxcsqunktmob.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_HNqDkSvMl7VFEbg6K3z5GA_15hBRKXg";

window.supabaseClient = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_ANON_KEY
);

console.log("HelpHive Supabase client loaded.");
```
