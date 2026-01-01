window.onload = function() {

    if (!localStorage.getItem("isAuthenticated")) {
        window.location.href = "index.html";
    }

    let currentEntity = "patients";

    let data = JSON.parse(localStorage.getItem("data")) || {
        patients: [],
        medecins: [],
        rendezvous: [],
        services: []
    };

    const title = document.getElementById("page-title");
    const form = document.getElementById("crud-form");
    const tableBody = document.getElementById("table-body");
    const field1 = document.getElementById("field1");
    const field2 = document.getElementById("field2");

    // Variable pour suivre l'édition
    let editId = null;

    function loadEntity(entity) {
        currentEntity = entity;
        editId = null; // Réinitialiser l'édition quand on change d'entité

        if (entity === "patients") { title.innerText="Patients"; field1.placeholder="Nom du patient"; field2.placeholder="Téléphone"; }
        if (entity === "medecins") { title.innerText="Médecins"; field1.placeholder="Nom du médecin"; field2.placeholder="Spécialité"; }
        if (entity === "rendezvous") { title.innerText="Rendez-vous"; field1.placeholder="Nom du patient"; field2.placeholder="Date du rendez-vous"; }
        if (entity === "services") { title.innerText="Services"; field1.placeholder="Nom du service"; field2.placeholder="Prix"; }

        field1.value = "";
        field2.value = "";
        renderTable();
    }

    // Ajouter ou modifier
    form.addEventListener("submit", e => {
        e.preventDefault();
        const val1 = field1.value.trim();
        const val2 = field2.value.trim();
        if(val1===""||val2===""){ alert("Veuillez remplir les deux champs"); return; }

        if (editId) {
            // Modifier
            data[currentEntity] = data[currentEntity].map(item=>{
                if(item.id===editId){
                    return {id:editId, field1:val1, field2:val2};
                }
                return item;
            });
            editId = null;
        } else {
            // Ajouter
            data[currentEntity].push({id:Date.now(), field1:val1, field2:val2});
        }

        localStorage.setItem("data", JSON.stringify(data));
        form.reset();
        renderTable();
    });

    function renderTable() {
        tableBody.innerHTML = "";
        if(data[currentEntity].length===0){ 
            tableBody.innerHTML=`<tr><td colspan="4">Aucun enregistrement</td></tr>`; 
            return; 
        }
        data[currentEntity].forEach(item=>{
            tableBody.innerHTML+=`
            <tr>
                <td>${item.id}</td>
                <td>${item.field1}</td>
                <td>${item.field2}</td>
                <td>
                    <button onclick="editItem(${item.id})">Modifier</button>
                    <button onclick="deleteItem(${item.id})">Supprimer</button>
                </td>
            </tr>`;
        });
    }

    window.deleteItem=function(id){
        if(confirm("Voulez-vous vraiment supprimer cet élément ?")){
            data[currentEntity]=data[currentEntity].filter(item=>item.id!==id);
            localStorage.setItem("data", JSON.stringify(data));
            renderTable();
        }
    }

    window.editItem=function(id){
        const item = data[currentEntity].find(item=>item.id===id);
        if(item){
            field1.value = item.field1;
            field2.value = item.field2;
            editId = id;
        }
    }

    window.loadEntity=loadEntity;

    loadEntity("patients");
}
