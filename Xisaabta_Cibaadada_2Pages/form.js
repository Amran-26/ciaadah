
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
}
