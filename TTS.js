const synth = window.speechSynthesis
const voices = window.speechSynthesis.getVoices()

function getString() {
   let selectedText = "";

   if (window.getSelection) {
        selectedText = window.getSelection().toString();
   } else if (document.selection && document.selection.type != "Control");

return selectedText;

}

document.addEventListener("mouseup", function () {
    let highlightedText = getString(); 

    if (highlightedText !== "") {
        console.log("Highlighted text: ", highlightedText);
        
        var utterance = new SpeechSynthesisUtterance(highlightedText);
        utterance.voice = voices[1];
        window.speechSynthesis.cancel();
        speechSynthesis.speak(utterance);
    }
    

});
