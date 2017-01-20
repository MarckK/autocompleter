let letters = document.getElementById('typed-letters');
  letters.addEventListener('keyup', getWords);
let button = document.getElementById('submit-button');
  button.addEventListener('click', getWords);
let requestCount = 0;

function getWords(e){
  requestCount++;
  const currentRequest = requestCount;
  e.preventDefault();
  let xhr = new XMLHttpRequest();

  xhr.onreadystatechange = function () {
    if(xhr.readyState === 4 && xhr.status === 200){
      if(currentRequest !== requestCount) return;
    let result = xhr.responseText.split(",");
    let table = document.getElementById('suggestions');
    while (table.firstChild) {
      table.removeChild(table.firstChild);
    }
      for(let x = 0; x < result.length; x++){
        table.insertRow(0);
        let row = table.insertRow(x + 1);
        let cell = row.insertCell(0);
        cell.innerHTML = result[x];
      }
    }
  }
  const url = '/create-response?inputString=' + encodeURIComponent(letters.value);
  xhr.open("GET", url);
  xhr.send();
}

function display() {
document.getElementById('display-content').innerHTML = text.value;
}
