chrome.runtime.onInstalled.addListener(() => {
    chrome.action.setBadgeText({
      text: 'OFF'
    });
  });

chrome.action.onClicked.addListener(async (tab) => {
      const prevState = await chrome.action.getBadgeText({ tabId: tab.id });
      const nextState = prevState === 'ON' ? 'OFF' : 'ON';
  
      // Set the action badge to the next state
      await chrome.action.setBadgeText({
        tabId: tab.id,
        text: nextState
      });
  
      if (nextState === 'ON') {
        chrome.scripting.executeScript({
            target: {tabId: tab.id, allFrames: true},
            files: ['content-script.js'],
          });
      } else if (nextState === 'OFF') {

      }
  });