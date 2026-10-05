import { supabase } from "./supabaseconfig.js";

document.addEventListener("DOMContentLoaded", () => {

    const loginForm = document.getElementById("loginForm");

    if (!loginForm) {
        console.error("Login form not found.");
        return;
    }

    loginForm.addEventListener("submit", async (e) => {

        e.preventDefault();

        const emailInput = document.getElementById("email");
        const passwordInput = document.getElementById("password");

        const emailError = document.getElementById("emailError");
        const passwordError = document.getElementById("passwordError");

        const email = emailInput.value.trim();
        const password = passwordInput.value;

        // Clear old errors
        emailError.textContent = "";
        passwordError.textContent = "";


        // =========================
        // VALIDATION
        // =========================

        if (!email) {
            emailError.textContent = "Please enter your email.";
            return;
        }

        if (!password) {
            passwordError.textContent = "Please enter your password.";
            return;
        }


        try {

            // =========================
            // LOGIN WITH SUPABASE
            // =========================

            const { data, error } =
                await supabase.auth.signInWithPassword({
                    email: email,
                    password: password
                });


            // Login failed
            if (error) {

                console.error("Supabase login error:", error);

                if (
                    error.message
                        .toLowerCase()
                        .includes("invalid login credentials")
                ) {
                    passwordError.textContent =
                        "Incorrect email or password.";
                }

                else if (
                    error.message
                        .toLowerCase()
                        .includes("email not confirmed")
                ) {
                    emailError.textContent =
                        "Please confirm your email before logging in.";
                }

                else {
                    passwordError.textContent = error.message;
                }

                return;
            }


            // =========================
            // CHECK USER
            // =========================

            if (!data.user) {

                passwordError.textContent =
                    "Login failed. User account could not be found.";

                return;
            }


            const user = data.user;

            console.log("LOGIN SUCCESSFUL");
            console.log("User ID:", user.id);
            console.log("Email:", user.email);
            console.log("User metadata:", user.user_metadata);


            // =========================
            // GET ROLE FROM PROFILES
            // =========================

            let role = null;

            const { data: profile, error: profileError } =
                await supabase
                    .from("profiles")
                    .select("role")
                    .eq("id", user.id)
                    .maybeSingle();


            if (profileError) {

                console.error(
                    "Profile lookup error:",
                    profileError
                );
            }


            if (profile && profile.role) {

                role = profile.role;

                console.log(
                    "Role from profiles:",
                    role
                );

            } else {

                // =========================
                // FALLBACK TO SIGNUP DATA
                // =========================

                role =
                    user.user_metadata?.account_type;

                console.log(
                    "Role from user metadata:",
                    role
                );
            }


            // =========================
            // NORMALIZE ROLE
            // =========================

            if (role) {
                role = role.toLowerCase().trim();
            }


            // =========================
            // REDIRECT
            // =========================

            if (role === "student") {

                console.log(
                    "Redirecting student to dashboard..."
                );

                window.location.href =
                    "dashboard.html";

            }

            else if (role === "owner") {

                console.log(
                    "Redirecting owner to owner dashboard..."
                );

                window.location.href =
                    "owner-dashboard.html";

            }

            else if (role === "superadmin") {

                console.log(
                    "Redirecting superadmin..."
                );

                window.location.href =
                    "superadmin-dashboard.html";

            }

            else {

                console.error(
                    "Invalid or missing account type:",
                    role
                );

                alert(
                    "Your account type could not be identified. Please contact the administrator."
                );

            }

        }

        catch (error) {

            console.error(
                "Unexpected login error:",
                error
            );

            passwordError.textContent =
                error.message ||
                "Login failed. Please try again.";
        }

    });

});
