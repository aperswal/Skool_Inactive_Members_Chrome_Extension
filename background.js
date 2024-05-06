chrome.action.onClicked.addListener(() => {
    chrome.scripting.executeScript({
      target: { allFrames: true, tabId: tab.id },
      files: ['content.js']
    });
  });
  