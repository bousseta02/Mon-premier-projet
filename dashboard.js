if (!localStorage.getItem("connected")) {
    window.location.href = "index.html";
}

document.querySelectorAll(".sidebar a").forEach(link => {
    link.onclick = e => {
        e.preventDefault();
        const page = link.dataset.page;
        loadEntity(page); // Appelle le CRUD correspondant dans crud.js
    };
});
