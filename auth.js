/******** AUTH ********/
function login() {
    const u = document.getElementById("username").value;
    const p = document.getElementById("password").value;

    if (u === "admin" && p === "1234") {
        window.location.href = "dashboard.html";
    } else {
        alert("Identifiants incorrects");
    }
}

/******** CRUD ********/
let currentEntity = "";
let selectedIndex = null;

function showEntity(entity) {
    currentEntity = entity;
    selectedIndex = null;
    document.getElementById("entityTitle").innerText = entity;
    document.getElementById("field1").value = "";
    document.getElementById("field2").value = "";
    loadItems();
}

function getData() {
    return JSON.parse(localStorage.getItem(currentEntity)) || [];
}

function saveData(data) {
    localStorage.setItem(currentEntity, JSON.stringify(data));
}

function addItem() {
    const f1 = document.getElementById("field1").value;
    const f2 = document.getElementById("field2").value;
    if (!f1 || !f2) return alert("Champs requis");

    const data = getData();
    data.push({ f1, f2 });
    saveData(data);
    loadItems();
}

function loadItems() {
    const list = document.getElementById("list");
    list.innerHTML = "";
    getData().forEach((item, i) => {
        const li = document.createElement("li");
        li.innerHTML = `
            ${item.f1} - ${item.f2}
            <span>
                <button onclick="editItem(${i})">✏️</button>
                <button onclick="deleteItem(${i})">🗑️</button>
            </span>`;
        list.appendChild(li);
    });
}

function editItem(i) {
    const item = getData()[i];
    document.getElementById("field1").value = item.f1;
    document.getElementById("field2").value = item.f2;
    selectedIndex = i;
}

function updateItem() {
    if (selectedIndex === null) return alert("Sélectionnez un élément");
    const data = getData();
    data[selectedIndex] = {
        f1: field1.value,
        f2: field2.value
    };
    saveData(data);
    selectedIndex = null;
    loadItems();
}

function deleteItem(i) {
    const data = getData();
    data.splice(i, 1);
    saveData(data);
    loadItems();
}
