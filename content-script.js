var overlayElement = document.createElement('div');
overlayElement.id = 'my-overlay';
overlayElement.style.position = 'fixed';
overlayElement.style.margin = '0';
overlayElement.style.padding = '0';
overlayElement.style.left = '33%';
overlayElement.style.width = '40vw'; // Use viewport width
overlayElement.style.height = '100vh'; // Use viewport height
overlayElement.style.background = 'rgba(230, 215, 215, 0.5)'; // Adjust color and opacity as needed
overlayElement.style.zIndex = '9999'; // Make sure it's above other elements

document.body.appendChild(overlayElement)




