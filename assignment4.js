
document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");
    form.addEventListener("submit", (event) => {
        if (!validateForm()) {
            event.preventDefault();
        }
    });
});
function validateForm() {
    const firstName = document.getElementById('fName').value.trim();
    const lastName = document.getElementById('lName').value.trim();
    const address = document.getElementById('address').value.trim();
    const city = document.getElementById('city').value.trim();
    const email = document.getElementById('email').value.trim();
    const postal = document.getElementById('postal').value.trim();
    const province = document.getElementById('province').value.trim().toUpperCase();
    const age = parseInt(document.getElementById('age').value.trim());
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    if (!firstName || !lastName || !address || !city || !email || !postal || !province || !age || !password || !confirmPassword) {
        alert("All fields are required.");
        return false;
    }

    const postalRegex = /^[A-Za-z]\d[A-Za-z]\d[A-Za-z]\d$/;
    if (!postalRegex.test(postal)) {
        alert("Postal code must be in the format A1A1A1.");
        return false;
    }

    const validProvinces = ["QC", "ON", "MN", "SK", "AB", "BC"];
    if (!validProvinces.includes(province)) {
        alert("Province must be one of QC, ON, MN, SK, AB, BC.");
        return false;
    }

    if (age < 18) {
        alert("You must be at least 18 years old.");
        return false;
    }

    const emailRegex = /^[^@]+@[^@]+\.[^@]+$/;
    if (!emailRegex.test(email)) {
        alert("Please enter a valid email address.");
        return false;
    }

    if (password !== confirmPassword) {
        alert("Passwords do not match.");
        return false;
    }

    const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{6,}$/;
    if (!passwordRegex.test(password)) {
        alert("Password must be at least 6 characters and include one uppercase letter and one number.");
        return false;
    }

    alert("Thanks for registering with our website, your customer record was created successfully.");
    return true;
}

