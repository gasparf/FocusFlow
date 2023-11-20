  chrome.runtime.onInstalled.addListener(() => {
    chrome.action.setBadgeText({
      text: 'OFF'
    });
  });
  

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.badgeText) {
    chrome.action.setBadgeText({ text: message.badgeText });
  }
});

// Function to execute scripts based on badge text
// function executeScriptsByBadgeText(tabId, badgeText) {
//   const scriptFiles = badgeText === 'ON'
//       ? ['bionic-bolder.js', 'content-script.js']
//       : ['remove-child.js'];

//   chrome.scripting.executeScript({
//       target: { tabId, allFrames: true },
//       files: scriptFiles,
//   }, (results) => {
//     if (chrome.runtime.lastError) {
//         console.error('Script execution error:', chrome.runtime.lastError);
//     } else {
//         console.log('Scripts executed successfully:', results);
//     }
//   });
// }

// // Original click event listener (you can keep this if you need it)
// chrome.action.onClicked.addListener(async (tab) => {
//   const prevState = await chrome.action.getBadgeText({ tabId: tab.id });

//   // Update badge text
//   const newState = prevState === 'ON' ? 'OFF' : 'ON';
//   chrome.action.setBadgeText({ text: newState });

//   // Execute scripts based on the updated badge text
//   executeScriptsByBadgeText(tab.id, newState);
// });
  
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
        files: ['bionic-bolder.js', 'content-script.js'],
      });
  } else if (nextState === 'OFF') {
    chrome.scripting.executeScript({
      target: {tabId: tab.id, allFrames: true},
      files: ['remove-child.js'],
    });
  }
});

