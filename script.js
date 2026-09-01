const email = "testing@gmail.com";
const phone = "09171234567";
const password = "123";

document.getElementById("loginForm").addEventListener("submit", function(event) {

    event.preventDefault();

    let userEmail = document.getElementById("email").value;
    let userPassword = document.getElementById("password").value;

    let emailError = document.getElementById("emailError");
    let passwordError = document.getElementById("passwordError");

    emailError.textContent = "";
    passwordError.textContent = "";

    // Check if email is empty
    if (userEmail == "") {
        emailError.textContent = "Please enter your email or phone number.";
        return;
    }

    // Check if password is empty
    if (userPassword == "") {
        passwordError.textContent = "Please enter your password.";
        return;
    }

    const isEmail = userEmail.includes("@");
    const isPhone = /^[0-9]{11}$/.test(userEmail);

    if (!isEmail && !isPhone) {
        emailError.textContent = "Enter a valid email or phone number.";
        return;
    }

    // Check login
    if (
    (userEmail === email || userEmail === phone) &&
    userPassword === password
) {

    alert("Login Successful!");
    window.location.href = "dashboard.html";

} else {

    passwordError.textContent =
        "Incorrect email/phone number or password.";

}
});

const passwordInput = document.getElementById("password");
const toggle = document.getElementById("togglePassword");

toggle.addEventListener("click", function () {

    if (passwordInput.type === "password") {
        passwordInput.type = "text";
    } else {
        passwordInput.type = "password";
    }

});