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
  
      chrome.runtime.onMessage.addListener(
        function(request, sender, sendResponse) {
            if (request.requested == "createDiv"){
                //Code to create the div
                sendResponse({confirmation: "Successfully created div"});
            }
        });

      if (nextState === 'ON') {

        
      } else if (nextState === 'OFF') {

      }
  });