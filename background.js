chrome.runtime.onInstalled.addListener(() => {
    chrome.action.setBadgeText({
      text: 'OFF'
    });
  });

const extensions = 'https://developer.chrome.com/docs/extensions';
const webstore = 'https://developer.chrome.com/docs/webstore';