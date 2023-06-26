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
    "I can't / refuse to believe",
    "Something Lat related"
  ];

window.addEventListener('DOMContentLoaded', () => {
    getAllKyleReasons();
});

function getAllKyleReasons() {
    fetch('http://104.172.46.211:5000/kyleGetAllReasons')
      .then(response => response.json())
      .then(data => loadHTMLTable(data['data']));
}

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



