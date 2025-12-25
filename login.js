document.getElementById("loginBtn").onclick = function () {
    const user = username.value;
    const pass = password.value;

    if (user === "admin" && pass === "admin") {
        localStorage.setItem("connected", "true");
        window.location.href = "dashboard.html";
    } else {
        error.style.display = "block";
    }
};

