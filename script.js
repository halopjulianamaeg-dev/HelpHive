import { supabase } from './supabaseClient.js';

const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", async function (event) {

    event.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    const emailError = document.getElementById("emailError");
    const passwordError = document.getElementById("passwordError");

    // Clear previous errors
    emailError.textContent = "";
    passwordError.textContent = "";

    // Check email
    if (email === "") {
        emailError.textContent = "Please enter your email.";
        return;
    }

    // Check password
    if (password === "") {
        passwordError.textContent = "Please enter your password.";
        return;
    }

    // Login with Supabase
    const { error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password
    });

    if (error) {
       console.error("Supabase Login error:", error);
       passwordError.textContent = error.message;
        return;
    }

    alert("Login Successful!");

});


// Show/Hide Password
const passwordInput = document.getElementById("password");
const togglePassword = document.getElementById("togglePassword");

togglePassword.addEventListener("click", function () {

    if (passwordInput.type === "password") {
        passwordInput.type = "text";
    } else {
        passwordInput.type = "password";
    }

});
