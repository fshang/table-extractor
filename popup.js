document.getElementById('extractBtn').addEventListener('click', extractTables);
document.getElementById('copyBtn').addEventListener('click', copyData);
document.getElementById('clearBtn').addEventListener('click', clearData);

function extractTables() {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {action: "extract"}, function(response) {
      document.getElementById('output').innerHTML = response.data;
    });
  });
}

function copyData() {
  const output = document.getElementById('output');
  const tables = output.getElementsByTagName('table');
  let copyText = '';
  
  for (let table of tables) {
    for (let row of table.rows) {
      const cells = row.cells;
      for (let j = 0; j < cells.length; j++) {
        copyText += cells[j].innerText + '\t';
      }
      copyText += '\n';
    }
    copyText += '\n\n';
  }

  navigator.clipboard.writeText(copyText)
    .then(() => alert('Data copied to clipboard!'))
    .catch(err => console.error('Failed to copy: ', err));
}

function clearData() {
  document.getElementById('output').innerHTML = '';
}
