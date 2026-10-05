import { supabase } from "./supabaseconfig.js";

const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const emailError = document.getElementById("emailError");
    const passwordError = document.getElementById("passwordError");

    // Clear old errors
    emailError.textContent = "";
    passwordError.textContent = "";

    // Basic validation
    if (!email) {
        emailError.textContent = "Please enter your email.";
        return;
    }

    if (!password) {
        passwordError.textContent = "Please enter your password.";
        return;
    }

    try {
        // Login using Supabase Auth
        const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password
        });

        if (error) {
            console.error("Supabase error:", error);
            passwordError.textContent = error.message;
            return;
        }
        
        // Handle successful registration
        console.log("Registration successful:", data);

        // Make sure Supabase returned a user
        if (data.user) {
            const authUserId = data.user.id;
            console.log("Supabase Auth ID:", authUserId);

            // Email verification required
            if (!data.session) {
                showSuccess("Account created successfully! Please check your email to verify your account.");
                form.reset();
                console.log("User must verify email. Auth ID:", authUserId);
            }

            // Email verification not required
            else {
                console.log("User logged in. Auth ID:", authUserId);

                setTimeout(() => {
                    window.location.href = "dashboard.html";
                }, 500);
            }
        } else {
            showError("Registration completed, but the user account could not be found.");
        }

        // Handle failed registration
        if (error) {
            console.error("Registration failed:", error);

            if (
                error.message.includes("User already registered") ||
                error.message.includes("already registered")
            ) {
                showError("This email is already registered. Please use a different email or log in instead.");
                return;
            }

            if (error.message.includes("Invalid email")) {
                showError("Please enter a valid email address.");
                return;
            }

            if (error.message.toLowerCase().includes("password")) {
                showError("Your password does not meet the required requirements.");
                return;
            }

            if (error.message.toLowerCase().includes("rate limit")) {
                showError("Too many registration attempts. Please try again later.");
                return;
            }

            showError("Registration failed. Please check your information and try again.");
            return;
        }

        // Get user's role from profiles table
        const { data: profile, error: profileError } = await supabaseClient
            .from("profiles")
            .select("role")
            .eq("id", user.id)
            .single();

        if (profileError) {
            console.error(profileError);
            alert("Login successful, but your profile could not be found.");
            return;
        }

        console.log("User role:", profile.role);

        // Redirect according to role
        if (profile.role === "student") {
            window.location.href = "student-dashboard.html";
        } else if (profile.role === "owner") {
            window.location.href = "owner-dashboard.html";
        } else if (profile.role === "superadmin") {
            window.location.href = "superadmin-dashboard.html";
        } else {
            alert("Your account has an invalid role.");
        }
    } catch (error) {
        console.error("Login error:", error);

        if (error.message.toLowerCase().includes("invalid login credentials")) {
            passwordError.textContent = "Incorrect email or password.";
        } else {
            passwordError.textContent = error.message || "Login failed. Please try again.";
        }
    }
});