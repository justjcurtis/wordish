let w = 480
const wordEngine = new WordEngine()
let history;
let letters;
let currentGuess = ''
let availableLetters = []
let historyBox;
let totalText;
let foundCount = 0
let availableCount = 0

function setup() {
    w = windowWidth > 480 ? 480 : windowWidth
    createCanvas(w, 380)
    background('#1A1A1A')
    wordEngine.newWord()
    availableCount = wordEngine.allowed.filter(w => w.length >= 3).length
    letters = new Letters(wordEngine.letters, w)
    availableLetters = letters.chars.slice(0)
    historyBox = document.getElementById('historyBox')
    totalText = document.getElementById('total')
    history = new History(historyBox, totalText)
}

const renderGuess = guess => {
    push()
    noStroke()
    fill(255)
    textSize(40)
    text(guess, ((w / 3) + (5 - guess.length) * 10) + 10, 550 / 2, w * (2 / 3), 550 / 2 + 50)
    pop()
}

const renderCounter = () => {
    push()
    textSize(15)
    noStroke()
    fill(255)
    text(`${foundCount}/${availableCount}`, w - 50, 350, w - 30, 300)
    pop()
}

function draw() {
    background('#1A1A1A')

    letters.render()
    renderGuess(currentGuess)
    renderCounter()
}

const handleKey = (key, skipTint = false) => {
    if (availableLetters.includes(key)) {
        currentGuess += key
        const i = availableLetters.indexOf(key)
        if (!skipTint) letters.addTintToChar(key)
        availableLetters.splice(i, 1)
    }
    if (key == 'Backspace') {
        if (currentGuess.length < 1) return
        const char = currentGuess.slice(-1)
        letters.removeTintFromChar(char)
        currentGuess = currentGuess.slice(0, -1)
        availableLetters.push(char)
    }
    if (key == 'Enter' && currentGuess.length >= 3) {
        const score = wordEngine.getWordScore(currentGuess)
        if (score > 0) {
            history.add(currentGuess, score)
            availableLetters = letters.chars.slice(0)
            currentGuess = ''
            letters.tints = []
            foundCount++
        }
    }
    if (key == 'Meta') {
        console.log(wordEngine.word)
    }
    if (key == 'Control') {
        console.log(wordEngine.allowed.length)
    }
    if (key == '§') {
        console.log(wordEngine.allowed)
    }
}

function keyPressed() {
    handleKey(key)
}

let isBusy = false

function mousePressed() {
    if (isBusy) return
    isBusy = true
    const i = letters.wasClicked(mouseX, mouseY)
    const char = letters.chars[i]
    if (char != undefined) {
        letters.addTintToIndex(i)
        handleKey(char, true)
        setTimeout(() => { isBusy = false }, 200)
        return
    }
    if (mouseY < 350) {
        if (mouseX < 240) handleKey('Backspace')
        else handleKey('Enter')
    }
    setTimeout(() => { isBusy = false }, 200)
}