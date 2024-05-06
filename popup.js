document.getElementById('startScan').addEventListener('click', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        files: ['content.js']
      });
    });
  });
  
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'completeScan') {
      const downloadBtn = document.getElementById('downloadCSV');
      downloadBtn.style.display = 'block';
      downloadBtn.addEventListener('click', () => {
        const blob = new Blob([request.data], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        chrome.downloads.download({
          url,
          filename: 'inactive_members.csv'
        });
      });
    }
  });
  