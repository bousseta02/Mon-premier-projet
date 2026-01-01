const USER = { username: "admin", password: "1234" };

function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const error = document.getElementById("error");

    if (username === USER.username && password === USER.password) {
        localStorage.setItem("isAuthenticated", "true");
        window.location.href = "dashboard.html";
    } else {
        error.innerText = "Nom d'utilisateur ou mot de passe incorrect";
    }
}

function logout() {
    localStorage.removeItem("isAuthenticated");
    window.location.href = "index.html";
}
