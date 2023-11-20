const text = document.getElementById('my-overlay').querySelectorAll('h1, h2, h3, h4, h5, p, caption, span, pr')
// const text = document.querySelectorAll('h1, h2, h3, h4, h5, p, caption, span, pr')

for (let i = 0; i < text.length; i++) {
    if (text[i].innerHTML.length == 0) {
        continue
    }
    text[i].innerHTML = sentenceBionicBolder(text[i].innerHTML)
  }

function sentenceBionicBolder(html) {
    const State = {
        withinTag: 'withinTag',
        withinWord: 'withinWord',
        withinSpecial: 'withinSpecial',
        betweenStates: 'betweenStates'
    };
    const blacklist = /[^a-zA-Z]/g;

    var currWordStart = 0
    var state = State.betweenStates
    var boldedHTML = ''
    for (let i = 0; i < html.length; i++) {
        console.log(state)
        console.log(html[i])
        switch(state) {
            case State.withinTag:
                // encountered end of html tag
                if (html[i] == '>') { state = State.betweenStates}
                boldedHTML += html[i]
                break

            case State.withinWord:
                // encountered non-letter character after being within word
                if (html[i].match(blacklist) != null) {
                    var boldSubstr = html.substring(currWordStart, i)
                    boldedHTML += wordBionicBolder(boldSubstr)
                    if (html[i] == '<') {
                        state = State.withinTag
                    } else if (html[i] == '&') {
                        state = State.withinSpecial
                    } else {
                        state = State.betweenStates
                    }
                    boldedHTML += html[i]
                    console.log(boldSubstr)
                    console.log(boldedHTML)
                }
                break

            case State.withinSpecial:
                // end of special
                if (html[i].match(blacklist) != null) {
                    state = State.betweenStates
                }
                boldedHTML += html[i]
                break

            case State.betweenStates:
                // encountered beginning of html tag
                if (html[i] == '<') {
                    state = State.withinTag
                    boldedHTML += html[i]
                }

                // encountered beginning of special (e.g. &nbsp)
                 else if (html[i] == '&') {
                    state = State.withinSpecial
                    boldedHTML += html[i]
                }

                // encountered beginning of word
                else if (html[i].match(blacklist) == null) {
                    state = State.withinWord
                    currWordStart = i
                }

                // still between states
                else {
                    boldedHTML += html[i]
                }

                break
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
    return char === 'a' || char === 'e' || char === 'i' || char === 'o' || char === 'u' || char === 'A' || char === 'E' || char === 'I' || char === 'O' || char === 'U' || false;
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

    if (onset == '') {
        onset = word[0]
        remainder = word.substring(1, word.length)
    }

    return [onset, remainder]
}