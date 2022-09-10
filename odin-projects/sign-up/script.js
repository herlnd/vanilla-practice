const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirm-password");

const validatePassword = () => {
  password.value != confirmPassword.value
    ? confirmPassword.setCustomValidity("Passwords don't match")
    : confirmPassword.setCustomValidity("");
};

password.onchange = validatePassword;
confirmPassword.onkeyup = validatePassword;
