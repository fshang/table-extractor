chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === "extract") {
    const tables = document.getElementsByTagName('table');
    let extractedData = '';

    for (let table of tables) {
      extractedData += '<table>';
      const rows = table.rows;
      for (let i = 0; i < rows.length; i++) {
        extractedData += '<tr>';
        const cells = rows[i].cells;
        for (let j = 0; j < cells.length; j++) {
          const tag = i === 0 ? 'th' : 'td';
          extractedData += `<${tag}>${cells[j].innerText}</${tag}>`;
        }
        extractedData += '</tr>';
      }
      extractedData += '</table><br>';
    }

    sendResponse({data: extractedData});
  }
});
