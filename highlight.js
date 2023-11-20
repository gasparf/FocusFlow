highlightText = document.querySelectorAll('p')
for (let k = 0; k < highlightText.length; k++) {
    if (highlightText[k].innerHTML.indexOf("...") != -1) {
        highlightText[k].innerHTML = highlightText[k].innerHTML.replaceAll("...", "…")
    }
}
i = 0
strs = {}
idx = 0
smallSentence = 20
document.addEventListener('keypress', (key)=>{
    while (i < highlightText.length && highlightText[i].className != "") {
        i++
    }
    if (key.which == 13 && i < highlightText.length) {
        if (idx == 0) {
            strs = highlightText[i].innerHTML.split(".")
            len = strs.length
            if (strs[len - 1].length < 15) {
            len--
            strs[len] = "NULL"
            strs[len-1] += "."
            }
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
                if (len > 1) {
                strs[k] = "NULL"
                }
            }
            if (k < len - 1) {
                strs[k] += "."
            }
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
        if (idx >= len) {
            idx = 0
            i++
        }
    }
});