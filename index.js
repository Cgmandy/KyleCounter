var chart;
var data;
var formOpen;


var phrases = [
  "Predicted what he was going to say",
  "Roasted you for no reason",
  "Said something that triggered you",
  "I'm too sober",
  "My friend (obviously a female)",
  "We'll see",
  "We talk later tonight",
  "I'm broke",
  "Ripped ass",
  "Pedo Laugh",
  "Wait",
  "I didn't know, did you know",
  "Fumbled a girl",
  "Mentioned something Tesla related",
  "I can't believe"
];

function getKyleStatistics() {
  fetch('http://104.172.46.211:5000/kyleGetStatistics')
    .then(response => response.json())
    .then(data => loadData(data['data']));
}

function getKyleReasons() {
  fetch('http://104.172.46.211:5000/kyleGetReasons')
    .then(response => response.json())
    .then(data => loadHTMLTable(data['data']));
}

function loadData(databaseData) {
  if (databaseData.length === 0) {
    return;
  }

  var x = 0;
  databaseData.forEach(function ({ id, count }) {
    data.append({ x: phrases[x], value: count });
    console.log(phrases[x]);
    x++;
  });

  return data;

}


window.addEventListener('DOMContentLoaded', () => {

  getKyleStatistics();
  getKyleReasons(); 

  var form = document.querySelector("#dataForm");
  const reasonIDInput = document.getElementById("reasonIDInput");
  var buttons = document.getElementsByClassName("button");
  var buttonsCount = buttons.length;

  for (var i = 0; i < buttonsCount; i += 1) {
    buttons[i].onclick = function (e) {
      openForm();
      reasonIDInput.value = this.id;
    }
  }
  
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    
    var formData = new FormData(document.querySelector("#dataForm"));
    var reasonIDData = formData.get("reasonID");
    var contextData = formData.get("context");
    var nameData = formData.get("name");

    fetch('http://104.172.46.211:5000/kyleAddData', {
      headers: {
        'Content-type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({reasonID: reasonIDData, context: contextData, name: nameData })
    })
      .then(response => response.json())
      .then(data => refreshPage());

  });
});

function loadHTMLTable(data) {
  const table = document.querySelector('table tbody');
  
  if (data.length === 0) {
    table.innerHTML = "<tr><td class='no-data' colspan='5'>No Data</td></tr>";
    return;
  }
  
  let tableHtml = "";
  
  data.forEach(function ({ reason_id, context, date_added, victim }) {
    tableHtml += "<tr>";
    tableHtml += `<td>${phrases[reason_id - 1]}</td>`;
    tableHtml += `<td>${context}</td>`;
    tableHtml += `<td>${new Date(date_added).toLocaleString()}</td>`;
    tableHtml += `<td>${victim}</td>`;
    tableHtml += "</tr>";
  });
  
  table.innerHTML = tableHtml;
}

function openForm() {
  formOpen = true;
  document.getElementById("popupForm").style.display = "block";
}

function closeForm() {
  var form = document.querySelector("#dataForm");
  formOpen = false;
  document.getElementById("popupForm").style.display = "none";
  form.reset();
}

document.onkeydown = function (e) {
  e = e || window.event;
  if(formOpen && e.key=="Escape"){
    closeForm();
  }
}

function refreshPage() {
  location.reload();
}