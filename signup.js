document.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("signup-form");

    const fullname = document.getElementById("fullname");
    const accountType = document.getElementById("account-type");
    const email = document.getElementById("email");
    const password = document.getElementById("password");
    const confirmPassword = document.getElementById("confirm-password");

    const successAlert = document.getElementById("success-alert");
    const successMessage = document.getElementById("success-message");

    const errorAlert = document.getElementById("error-alert");
    const errorMessage = document.getElementById("error-message");

    const submitBtn = document.getElementById("submit-btn");
    const btnText = document.getElementById("btn-text");
    const spinner = document.getElementById("spinner");


    function showError(message) {
        errorMessage.textContent = message;
        errorAlert.classList.remove("hidden");
        successAlert.classList.add("hidden");
    }


    function showSuccess(message) {
        successMessage.textContent = message;
        successAlert.classList.remove("hidden");
        errorAlert.classList.add("hidden");
    }


    form.addEventListener("submit", async (event) => {

        event.preventDefault();

        successAlert.classList.add("hidden");
        errorAlert.classList.add("hidden");


        const name = fullname.value.trim();
        const type = accountType.value;
        const userEmail = email.value.trim();
        const userPassword = password.value;
        const confirm = confirmPassword.value;


        // VALIDATION

        if (name === "") {
            showError("Please enter your full name.");
            return;
        }

        if (userEmail === "") {
            showError("Please enter your email address.");
            return;
        }

        if (userPassword.length < 6) {
            showError("Password must be at least 6 characters.");
            return;
        }

        if (userPassword !== confirm) {
            showError("Passwords do not match.");
            return;
        }


        submitBtn.disabled = true;
        btnText.textContent = "Creating Account...";
        spinner.classList.remove("hidden");


        try {

            const { data, error } = await supabaseClient.auth.signUp({

                email: userEmail,

                password: userPassword,

                options: {

                    data: {
                        full_name: name,
                        account_type: type
                    },

                    // IMPORTANT:
                    // This must be inside options
                    emailRedirectTo:
                        "http://127.0.0.1:5500/pages/login.html"
                }
            });


            if (error) {

                console.error("Supabase error:", error);

                showError(error.message);

                return;
            }


            console.log("REGISTRATION DATA:", data);
            console.log("USER:", data.user);
            console.log("SESSION:", data.session);
            console.log("USER ID:", data.user?.id);


            // If email confirmation is disabled
            if (data.session) {

                showSuccess(
                    "Registration successful! Redirecting..."
                );


                setTimeout(() => {

                    window.location.href =
                        "../index.html";

                }, 1500);


            } else {

                // If email confirmation is enabled

                showSuccess(
                    "Registration successful! Please check your email to verify your account."
                );

                form.reset();
            }


        } catch (error) {

            console.error("Registration error:", error);

            showError(
                "Unable to register. Please check your internet connection and try again."
            );

        } finally {

            submitBtn.disabled = false;

            btnText.textContent = "Sign Up";

            spinner.classList.add("hidden");
        }

    });


    // TOGGLE PASSWORD

    document
        .getElementById("toggle-password")
        .addEventListener("click", () => {

            const icon = document.getElementById("eye-icon");

            if (password.type === "password") {

                password.type = "text";

                icon.classList.remove("fa-eye");
                icon.classList.add("fa-eye-slash");

            } else {

                password.type = "password";

                icon.classList.remove("fa-eye-slash");
                icon.classList.add("fa-eye");
            }

        });


    // TOGGLE CONFIRM PASSWORD

    document
        .getElementById("toggle-confirm-password")
        .addEventListener("click", () => {

            const icon =
                document.getElementById("confirm-eye-icon");


            if (confirmPassword.type === "password") {

                confirmPassword.type = "text";

                icon.classList.remove("fa-eye");
                icon.classList.add("fa-eye-slash");

            } else {

                confirmPassword.type = "password";

                icon.classList.remove("fa-eye-slash");
                icon.classList.add("fa-eye");
            }

        });

});
