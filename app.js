/*********************************
 * AUTHENTIFICATION
 *********************************/
function login() {
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    if (username === "admin" && password === "1234") {
        // mémoriser la session
        localStorage.setItem("isLoggedIn", "true");
        window.location.replace("dashboard.html");
    } else {
        alert("Identifiants incorrects");
    }
}

/*********************************
 * PROTECTION DASHBOARD
 *********************************/
if (window.location.pathname.includes("dashboard.html")) {
    if (localStorage.getItem("isLoggedIn") !== "true") {
        window.location.replace("index.html");
    }
}

/*********************************
 * CRUD GÉNÉRIQUE
 *********************************/
let currentEntity = null;
let selectedIndex = null;

/* Sélection d'une entité */
function showEntity(entity) {
    currentEntity = entity;
    selectedIndex = null;

    document.getElementById("entityTitle").innerText = entity;
    document.getElementById("field1").value = "";
    document.getElementById("field2").value = "";

    loadItems();
}

/* Récupérer données */
function getData() {
    if (!currentEntity) return [];
    return JSON.parse(localStorage.getItem(currentEntity)) || [];
}

/* Sauvegarder données */
function saveData(data) {
    localStorage.setItem(currentEntity, JSON.stringify(data));
}

/* Ajouter */
function addItem() {
    if (!currentEntity) {
        alert("Veuillez sélectionner une entité");
        return;
    }

    const field1 = document.getElementById("field1").value.trim();
    const field2 = document.getElementById("field2").value.trim();

    if (field1 === "" || field2 === "") {
        alert("Tous les champs sont obligatoires");
        return;
    }

    const data = getData();
    data.push({ field1, field2 });
    saveData(data);

    document.getElementById("field1").value = "";
    document.getElementById("field2").value = "";

    loadItems();
}

/* Afficher */
function loadItems() {
    const list = document.getElementById("list");
    list.innerHTML = "";

    const data = getData();

    data.forEach((item, index) => {
        const li = document.createElement("li");
        li.innerHTML = `
            <span>${item.field1} - ${item.field2}</span>
            <div>
                <button onclick="editItem(${index})">✏️</button>
                <button onclick="deleteItem(${index})">🗑️</button>
            </div>
        `;
        list.appendChild(li);
    });
}

/* Modifier */
function editItem(index) {
    const data = getData();
    document.getElementById("field1").value = data[index].field1;
    document.getElementById("field2").value = data[index].field2;
    selectedIndex = index;
}

/* Valider modification */
function updateItem() {
    if (selectedIndex === null) {
        alert("Sélectionnez un élément");
        return;
    }

    const field1 = document.getElementById("field1").value.trim();
    const field2 = document.getElementById("field2").value.trim();

    const data = getData();
    data[selectedIndex] = { field1, field2 };
    saveData(data);

    selectedIndex = null;
    document.getElementById("field1").value = "";
    document.getElementById("field2").value = "";

    loadItems();
}

/* Supprimer */
function deleteItem(index) {
    const data = getData();
    data.splice(index, 1);
    saveData(data);
    loadItems();
}
/*********************************
 * DÉCONNEXION
 *********************************/
function logout() {
    localStorage.removeItem("isLoggedIn");
    window.location.replace("index.html");
}

