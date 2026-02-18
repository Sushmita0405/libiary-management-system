function login() {

    let user = document.getElementById("username").value;
    let pass = document.getElementById("password").value;
    let msg = document.getElementById("msg");

    if (user === "" || pass === "") {
        msg.innerHTML = "Please fill all fields";
        return;
    }

    // Temporary Login (for testing)
    if (pass === "1234") {

        // Save username
        localStorage.setItem("adminName", user);

        // go to admin
        window.location.href = "admin.html";

    } else {

        msg.innerHTML = "Invalid Login";

    }
}