// ===== Références aux conteneurs HTML =====
const pageTitle = document.getElementById("page-title");
const pageContent = document.getElementById("page-content");

// ===== DONNÉES =====
let patients = [], medecins = [], rdvs = [], prescriptions = [], services = [];
let editIndex = null, editEntity = null;

// ===== FONCTION DE NAVIGATION =====
function loadEntity(entity) {
    editIndex = null;
    editEntity = entity;

    switch(entity) {
        case "patients": loadPatients(); break;
        case "medecins": loadMedecins(); break;
        case "rendezvous": loadRendezVous(); break;
        case "prescriptions": loadPrescriptions(); break;
        case "services": loadServices(); break;
    }
}

// ==================== PATIENTS ====================
function loadPatients() {
    pageTitle.innerText = "Patients";
    pageContent.innerHTML = `
        <input id="pNom" placeholder="Nom">
        <input id="pAge" placeholder="Âge">
        <button onclick="savePatient()">Enregistrer</button>
        <table>
            <tr><th>Nom</th><th>Âge</th><th>Actions</th></tr>
            ${patients.map((p,i)=>`
            <tr>
                <td>${p.nom}</td>
                <td>${p.age}</td>
                <td>
                    <button onclick="editPatient(${i})">✏️</button>
                    <button onclick="deletePatient(${i})">🗑️</button>
                </td>
            </tr>`).join("")}
        </table>`;
}

function savePatient() {
    const nom = pNom.value, age = pAge.value;
    if(editIndex===null) patients.push({nom, age});
    else patients[editIndex] = {nom, age};
    editIndex=null; loadPatients();
}

function editPatient(i) { pNom.value=patients[i].nom; pAge.value=patients[i].age; editIndex=i; }
function deletePatient(i) { patients.splice(i,1); loadPatients(); }

// ==================== MEDECINS ====================
function loadMedecins() {
    pageTitle.innerText = "Médecins";
    pageContent.innerHTML = `
        <input id="mNom" placeholder="Nom">
        <input id="mSpec" placeholder="Spécialité">
        <button onclick="saveMedecin()">Enregistrer</button>
        <table>
            <tr><th>Nom</th><th>Spécialité</th><th>Actions</th></tr>
            ${medecins.map((m,i)=>`
            <tr>
                <td>${m.nom}</td>
                <td>${m.spec}</td>
                <td>
                    <button onclick="editMedecin(${i})">✏️</button>
                    <button onclick="deleteMedecin(${i})">🗑️</button>
                </td>
            </tr>`).join("")}
        </table>`;
}

function saveMedecin() {
    const nom=mNom.value,spec=mSpec.value;
    if(editIndex===null) medecins.push({nom,spec});
    else medecins[editIndex]={nom,spec};
    editIndex=null; loadMedecins();
}

function editMedecin(i){ mNom.value=medecins[i].nom; mSpec.value=medecins[i].spec; editIndex=i; }
function deleteMedecin(i){ medecins.splice(i,1); loadMedecins(); }

// ==================== RENDEZ-VOUS ====================
function loadRendezVous() {
    pageTitle.innerText = "Rendez-vous";
    pageContent.innerHTML = `
        <input id="rDate" placeholder="Date">
        <input id="rPatient" placeholder="Patient">
        <button onclick="saveRdv()">Ajouter</button>
        <table>
            <tr><th>Date</th><th>Patient</th><th>Actions</th></tr>
            ${rdvs.map((r,i)=>`
            <tr>
                <td>${r.date}</td>
                <td>${r.patient}</td>
                <td>
                    <button onclick="deleteRdv(${i})">🗑️</button>
                </td>
            </tr>`).join("")}
        </table>`;
}

function saveRdv(){ rdvs.push({date:rDate.value,patient:rPatient.value}); loadRendezVous();}
function deleteRdv(i){ rdvs.splice(i,1); loadRendezVous(); }

// ==================== PRESCRIPTIONS ====================
function loadPrescriptions() {
    pageTitle.innerText = "Prescriptions";
    pageContent.innerHTML = `
        <input id="prMed" placeholder="Médicament">
        <input id="prPatient" placeholder="Patient">
        <button onclick="savePrescription()">Ajouter</button>
        <table>
            <tr><th>Médicament</th><th>Patient</th><th>Actions</th></tr>
            ${prescriptions.map((p,i)=>`
            <tr>
                <td>${p.med}</td>
                <td>${p.patient}</td>
                <td>
                    <button onclick="deletePrescription(${i})">🗑️</button>
                </td>
            </tr>`).join("")}
        </table>`;
}

function savePrescription(){ prescriptions.push({med:prMed.value,patient:prPatient.value}); loadPrescriptions();}
function deletePrescription(i){ prescriptions.splice(i,1); loadPrescriptions(); }

// ==================== SERVICES ====================
function loadServices() {
    pageTitle.innerText = "Services";
    pageContent.innerHTML = `
        <input id="sNom" placeholder="Nom du service">
        <button onclick="saveService()">Ajouter</button>
        <table>
            <tr><th>Nom</th><th>Actions</th></tr>
            ${services.map((s,i)=>`
            <tr>
                <td>${s.nom}</td>
                <td>
                    <button onclick="deleteService(${i})">🗑️</button>
                </td>
            </tr>`).join("")}
        </table>`;
}

function saveService(){ services.push({nom:sNom.value}); loadServices();}
function deleteService(i){ services.splice(i,1); loadServices();}
