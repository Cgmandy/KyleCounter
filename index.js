var chart;
var data;

var phrases = [
  "Predicted what he was going to say",
  "Roasted you for no reason",
  "Said something that triggered you",
  "My friend (obviously a female)",
  "I'm too sober",
  "We'll see",
  "We talk later tonight",
  "Ripped ass",
  "Pedo Laugh",
  "Wait",
  "I didn't know, did you know",
  "Fumbled a girl",
  "Mentioned something Tesla related",
  "I can't believe"
];

function getData(){
  fetch('https://104.172.46.211:5000/kyleGetAll')
  .then(response =>  response.json())
  .then(data => loadData(data['data']));
}

function loadData(databaseData) {
  if(databaseData.length === 0) {
    return;
  }

  var x = 0;
  databaseData.forEach(function ({id, count}){
    data.append({x: phrases[x], value: count});
    x++;
  });

  return data;
  
}


window.addEventListener('DOMContentLoaded', ()=> {
  
  getData();

  var buttons = document.getElementsByClassName("button");
  var buttonsCount = buttons.length;
  
  for (var i = 0; i < buttonsCount; i += 1) {
    buttons[i].onclick = function(e) {
      
    fetch('https://104.172.46.211:5000/kyleAddData', {
      headers: {
        'Content-type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({id : this.id})
    })
    .then(response => response.json())
    .then(data => refreshPage());
  }
}
});


function refreshPage(){
  location.reload();
}
