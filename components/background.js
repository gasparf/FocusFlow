function CreateOverlay() {
    console.log("Created");
    var div = document.createElement("div");
    div.style.width = "100px";
    div.style.height = "100px";
    div.innerHTML = "Hello";
    document.body.appendChild(div);
}

chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {CreateOverlay}, function(response) {
        console.log(response.confirmation);
    });
});



