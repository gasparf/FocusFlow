const text = document.querySelectorAll('h1, h2, h3, h4, h5, p, caption, span')

for (let i = 0; i < text.length; i++) {
    if (text[i].innerHTML.length == 0) {
        continue
    }
    if (text[i].innerHTML[0] == '<') {
        continue
    }

    text[i].innerHTML = sentenceBionicBolder(text[i].innerHTML)
  }

function sentenceBionicBolder(html) {
    const blacklist = /[^a-zA-Z]/g
    var boldedHTML = ''
    var currWordStart = 0
    var currentlyInTag = false
    var currentlyInWord = false
    for (let i = 0; i < html.length; i++) {
        if (currentlyInTag) {
            // encountered end of html tag
            if (html[i] == '>') { currentlyInTag = false }
            boldedHTML += html[i]

        } else {
            // encountered beginning of html tag
            if (html[i] == '<') {
                currentlyInTag = true
                boldedHTML += html[i]
                continue
            }

            // encountered beginning of word
            if (html[i].match(blacklist) == null && currentlyInWord == false) {
                currentlyInWord = true
                currWordStart = i
                continue
            }

            // encountered non-letter character after being within word
            if (html[i].match(blacklist) != null) {
                if (currentlyInWord) {
                    var boldSubstr = html.substring(currWordStart, i)
                    boldedHTML += wordBionicBolder(boldSubstr)
                    currentlyInWord = false
                }
                boldedHTML += html[i]
                continue
            }
        }
    }

    return boldedHTML
}

function wordBionicBolder(word) {
    var boldedText = word.substring(0,2)
    var remainingText = word.substring(2,word.length)
    
    var bionicWord = '<b>' + boldedText + '</b>' + remainingText

    return bionicWord
}