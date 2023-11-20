highlightText = document.querySelectorAll('p')

// makes all "..." into "…"
for (let k = 0; k < highlightText.length; k++) {
    if (highlightText[k].innerHTML.indexOf("...") != -1) {
        highlightText[k].innerHTML = highlightText[k].innerHTML.replaceAll("...", "…")
    }
}

i = 0 // the index of the current chunk of text
strs = {} // the list containing every sentence in the current chunk of text
idx = 0 // the index of the current sentence in the current chunk of test
smallSentence = 20 // what makes a sentence small
document.addEventListener('keypress', (key)=>{
    // only include <p> and not <p anything else>
    while (i < highlightText.length && highlightText[i].className != "") {
        i++
    }
    
    if (key.which == 13 && i < highlightText.length) {
        if (idx == 0) {
            strs = highlightText[i].innerHTML.split(".")
            len = strs.length
            // if (strs[len - 1].length < 15) {
            //     len--
            //     strs[len] = "NULL"
            //     strs[len-1] += "."
            // }
            for (let k = 0; k < len; k++) {
                if (strs[k] != "NULL" && strs[k].length < smallSentence) {
                    if (k != 0) {
                        j = k - 1
                        while (j >= 0) {
                            if (strs[j] != "NULL") {
                            strs[j] = strs[j] + strs[k]
                            break
                            }
                            j--
                        }
                    }
                    if (len > 1) strs[k] = "NULL"
                }
                if (k < len - 1 && strs[k] != "NULL") {
                    strs[k] += "."
                }
                console.log(strs[k])
            }
        }
        str = ""
        for (let k = 0; k < len; k++) {
            while (k < len && strs[k] == "NULL") {
                if (idx == k) idx++
                k++
            }
            if (k < len && strs[k] != "NULL") {
                if (k == idx) {
                    strs[k] = '<mark>' + strs[k] + '</mark>'
                    str += strs[k]
                } else {
                    str += strs[k]
                }
            }
        }
        idx++
        highlightText[i].innerHTML = str
        if (idx >= len || (strs[idx] == "NULL" && idx == len - 1)) {
            idx = 0
            i++
        }
    }
});