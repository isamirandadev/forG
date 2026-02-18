document.getElementById("loginForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    if (username === "velocita" && password === "2024") {
        alert("Seja bem-vindo, meu amor");
setTimeout(() => {
    window.location.href = "home.html";
}, 800);

    } else {
        alert("Username ou senha incorretos.");
    }
});
