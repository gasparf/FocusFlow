// popup.js
document.addEventListener('DOMContentLoaded', function () {
    var successOutlined = document.getElementById('success-outlined');
    var dangerOutlined = document.getElementById('danger-outlined');
  
    successOutlined.addEventListener('click', function () {
        executeContentScript();
        changeBadgeText('ON');
    });

    dangerOutlined.addEventListener('click', function () {
        // You can execute the remove-child.js script here if needed
        changeBadgeText('OFF');
    });
  
    function changeBadgeText(state) {
      console.log('Changing badge text to:', state);
      chrome.runtime.sendMessage({ badgeText: state });
    }

    // function executeContentScript() {
    //     chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    //         chrome.scripting.executeScript({
    //             target: { tabId: tabs[0].id, allFrames: true },
    //             files: ['content-scripts.js'],
    //         }, function (results) {
    //             if (chrome.runtime.lastError) {
    //                 console.error('Script execution error:', chrome.runtime.lastError);
    //             } else {
    //                 console.log('content-scripts.js executed successfully:', results);
    //             }
    //         });
    //     });
    // }
  });