
function deleteEntry(index) {
  const history = JSON.parse(localStorage.getItem("cibaadoHistory") || "[]");
  history.splice(index, 1);
  localStorage.setItem("cibaadoHistory", JSON.stringify(history));
  loadHistory();
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
        <button onclick="deleteEntry(${index})">Delete</button>
      </td>`;
    table.appendChild(row);
  });
}

window.onload = loadHistory;
