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
    var syllables = syllabify(word)
    var boldedText = ''
    var remainingText = ''

    if (syllables == null) {
        // non-vowel words (e.g. acronyms like NLP)
        boldedText = word[0]
        remainingText = word.substring(1, word.length)

    } else if (syllables.length > 1) {
        // multi syllable words
        boldedText = syllables[0]
        remainingText = syllables.slice(1).join('')

    } else {
        // single syllable words
        if (isVowel(word[0])) {
            // first letter is a vowel
            boldedText = word[0]
            remainingText = word.substring(1, word.length)

        } else {
            // first letter is a consonant
            // onset is the set of initial consonants before a vowel
            var onsetRemoved = splitOnset(word)
            boldedText = onsetRemoved[0]
            remainingText = onsetRemoved[1]
        }
    }

    var bionicWord = '<b>' + boldedText + '</b>' + remainingText
    return bionicWord
}

// https://stackoverflow.com/questions/49403285/splitting-word-into-syllables-in-javascript
function syllabify(word) {
    const syllableRegex = /[^aeiouy]*[aeiouy]+(?:[^aeiouy]*$|[^aeiouy](?=[^aeiouy]))?/gi;
    return word.match(syllableRegex);
}

// fast vowel checker from
// https://stackoverflow.com/questions/5488028/how-do-i-check-for-vowels-in-javascript
function isVowel(char)
{
    return char === 'a' || char === 'e' || char === 'i' || char === 'o' || char === 'u' || false;
}

function splitOnset(word) {
    var onset = ''
    var remainder = ''

    for (let i = 0; i < word.length; i++) {
        if (isVowel(word[i])) {
            onset = word.substring(0, i)
            remainder = word.substring(i, word.length)
            break
        }
    }

    return [onset, remainder]
}