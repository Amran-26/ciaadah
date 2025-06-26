
function saveCibaado() {
  const taariikh = new Date().toLocaleDateString();
  const cibaado = {
    date: taariikh,
    salaadaha: [],
    adkaarta: [],
    quraan: document.getElementById("quraanBogag").value,
    adkaarKale: document.getElementById("adkaarKale").value,
    saliga: document.getElementById("saliga").value
  };

  if (document.getElementById("salaadSubax").checked) cibaado.salaadaha.push("Subax");
  if (document.getElementById("salaadDuhur").checked) cibaado.salaadaha.push("Duhur");
  if (document.getElementById("salaadCasar").checked) cibaado.salaadaha.push("Casar");
  if (document.getElementById("salaadMaqrib").checked) cibaado.salaadaha.push("Maqrib");
  if (document.getElementById("salaadCishaa").checked) cibaado.salaadaha.push("Cishaa");

  if (document.getElementById("adkaarSubax").checked) cibaado.adkaarta.push("Adkaar Subax");
  if (document.getElementById("adkaarHabeen").checked) cibaado.adkaarta.push("Adkaar Habeenkii");

  const history = JSON.parse(localStorage.getItem("cibaadoHistory") || "[]");
  history.push(cibaado);
  localStorage.setItem("cibaadoHistory", JSON.stringify(history));

  document.getElementById("msg").innerText = "Cibaadooyinka waa la keydiyey ✅";

  // Clear form
  ["salaadSubax","salaadDuhur","salaadCasar","salaadMaqrib","salaadCishaa","adkaarSubax","adkaarHabeen"].forEach(id => {
    document.getElementById(id).checked = false;
  });
  document.getElementById("quraanBogag").value = "";
  document.getElementById("adkaarKale").value = "";
  document.getElementById("saliga").value = "";

  loadHistory();
}

function deleteEntry(index) {
  const history = JSON.parse(localStorage.getItem("cibaadoHistory") || "[]");
  history.splice(index, 1);
  localStorage.setItem("cibaadoHistory", JSON.stringify(history));
  loadHistory();
}

function editEntry(index) {
  const history = JSON.parse(localStorage.getItem("cibaadoHistory") || "[]");
  const entry = history[index];

  entry.salaadaha.forEach(s => {
    const id = "salaad" + s;
    if (document.getElementById(id)) document.getElementById(id).checked = true;
  });

  entry.adkaarta.forEach(s => {
    if (s === "Adkaar Subax") document.getElementById("adkaarSubax").checked = true;
    if (s === "Adkaar Habeenkii") document.getElementById("adkaarHabeen").checked = true;
  });

  document.getElementById("quraanBogag").value = entry.quraan;
  document.getElementById("adkaarKale").value = entry.adkaarKale;
  document.getElementById("saliga").value = entry.saliga;

  deleteEntry(index); // Remove so user can update
}

function loadHistory() {
  const table = document.getElementById("historyTable");
  table.innerHTML = "";
  const history = JSON.parse(localStorage.getItem("cibaadoHistory") || "[]");

  history.forEach((entry, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${entry.date}</td>
      <td>
        <strong>Salaad:</strong> ${entry.salaadaha.join(", ")}<br>
        <strong>Adkaar:</strong> ${entry.adkaarta.join(", ")}<br>
        <strong>Qur’aan:</strong> ${entry.quraan} bog<br>
        <strong>Adkaar Kale:</strong> ${entry.adkaarKale}<br>
        <strong>Saliga:</strong> ${entry.saliga}
      </td>
      <td>
        <button onclick="editEntry(${index})">Edit</button>
        <button onclick="deleteEntry(${index})">Delete</button>
      </td>`;
    table.appendChild(row);
  });
}

window.onload = loadHistory;
