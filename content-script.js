var overlayElement = document.createElement('div');
//styling
overlayElement.id = 'my-overlay';
overlayElement.style.position = 'fixed';
overlayElement.style.margin = '0';
overlayElement.style.padding = '0';
overlayElement.style.left = '0';
overlayElement.style.top = '0';
overlayElement.style.width = '100vw'; // Use viewport width
overlayElement.style.height = '100vh'; // Use viewport height
overlayElement.style.background = 'rgba(0, 0, 0, 0.75)'; // Adjust color and opacity as needed
overlayElement.style.overflow = 'auto'; // Enable scrolling
overlayElement.style.zIndex = '9999'; // Make sure it's above other elements


    // Additional styles to handle content width
    overlayElement.style.display = 'flex'; // Use flexbox to center the content horizontally
    overlayElement.style.alignItems = 'flex-start'; // Center content vertically
    overlayElement.style.justifyContent = 'center'

    // Retrieve the body content of the document
    var webpageBodyHTML = document.body.innerHTML;

    // Set the retrieved body HTML as the content of the overlay
    overlayElement.innerHTML = webpageBodyHTML;
    overlayElement.style.maxWidth = '100%'; // Set maximum width to 100% of the container
    // overlayElement.style.whiteSpace = 'pre-wrap'; // Preserve whitespace and allow wrapping

    document.body.style.overflow = 'hidden'; // Disable scrolling on the original body
    document.body.style.margin = '0';

document.body.appendChild(overlayElement)

