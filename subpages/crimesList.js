var URL = "http://104.172.46.211:5000"
// var URL = "http://localhost:5000"

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
    fetch(URL + '/kyleGetAllReasons')
      .then(response => response.json())
      .then(data => loadHTMLTable(data['data']));
}

function editKyleReason(number, context, victim) {
  fetch(URL + '/kyleEditData', {
    headers: {
      'Content-type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify({number: number, context: context, victim: victim })
  })
    .then(response => response.json())
    .then(data => getAllKyleReasons());
}

function loadHTMLTable(data) {
    const table = document.querySelector('table tbody');
  
    if (data.length === 0) {
      table.innerHTML = "<tr><td class='no-data' colspan='5'>No Data</td></tr>";
      return;
    }
  
    let tableHtml = "";
  
    data.forEach(function ({number, reason_id, context, date_added, victim }) {
      tableHtml += `<tr id="${number}">`;
      tableHtml += `<td class="reason">${phrases[reason_id - 1]}</td>`;
      tableHtml += `<td class="context">${context}</td>`;
      tableHtml += `<td class="dateAdded">${new Date(date_added).toLocaleString()}</td>`;
      tableHtml += `<td class="victim">${victim}</td>`;
      tableHtml += `<td class="editButtonRow"><button class="editButton" id="editButton${number}">Edit</button></td>`;
      tableHtml += "</tr>";
    });
  
    table.innerHTML = tableHtml;

    var buttons = document.getElementsByClassName("editButton");
    var buttonsCount = buttons.length;

  
    for (var i = 0; i < buttonsCount; i += 1) {
      buttons[i].onclick = function (e) {

        var rowElement = this.parentElement.parentElement;
        
        var contextColumn = rowElement.getElementsByClassName("context");
        var victimColumn = rowElement.getElementsByClassName("victim");
        var buttonColumn = rowElement.getElementsByClassName("editButtonRow");

        var oldContextText = contextColumn[0].textContent;
        var oldVictimText = victimColumn[0].textContent;

        contextColumn[0].innerHTML = `<input id="editContext" value="${oldContextText}" >`;
        victimColumn[0].innerHTML = `<input id="editVictim" value="${oldVictimText}" >`;
        buttonColumn[0].innerHTML = ``;
        buttonColumn[0].appendChild(createSubmitButton());
      }
    }
}

function createSubmitButton(){
  var button = document.createElement('button');
  button.innerHTML=`<button class="submitButton">Submit</button>`;
  button.onclick = function(e){
    var number = this.parentElement.parentElement.id;

    var editContextText = document.querySelector("#editContext");
    var editVictimText = document.querySelector("#editVictim");

    editKyleReason(number, editContextText.value, editVictimText.value)

  }
  return button;
}


