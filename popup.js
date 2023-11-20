// popup.js
document.addEventListener('DOMContentLoaded', function () {
    var successOutlined = document.getElementById('success-outlined');
    var dangerOutlined = document.getElementById('danger-outlined');
  
    successOutlined.addEventListener('click', function () {
      changeBadgeText('ON');
    });
  
    dangerOutlined.addEventListener('click', function () {
      changeBadgeText('OFF');
    });
  
    function changeBadgeText(state) {
      console.log('Changing badge text to:', state);
      chrome.runtime.sendMessage({ badgeText: state });
    }
  });