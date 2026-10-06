const SUPABASE_URL = 'YOUR_ACTUAL_SUPABASE_URL';

const SUPABASE_ANON_KEY = 'YOUR_ACTUAL_SUPABASE_ANON_KEY';


const supabaseClient =
    window.supabase.createClient(
        SUPABASE_URL,
        SUPABASE_ANON_KEY
    );


console.log(
    "SUPABASE CLIENT LOADED:",
    supabaseClient
);
