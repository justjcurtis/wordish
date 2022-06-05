let w = 480
let h = 720
const wordEngine = new WordEngine()
const history = new History()
let letters;
let currentGuess = ''
let availableLetters = []

function setup() {
    createCanvas(w, windowHeight)
    background('#1A1A1A')
    wordEngine.newWord()
    letters = new Letters(wordEngine.letters, w)
    availableLetters = letters.chars.slice(0)
}

const renderGuess = guess => {
    push()
    noStroke()
    fill(255)
    textSize(40)
    text(guess, ((w / 3) + (5 - guess.length) * 10) + 10, h / 2, w * (2 / 3), windowHeight / 2 + 50)
    pop()
}

function draw() {
    background('#1A1A1A')

    letters.render()
    renderGuess(currentGuess)
    history.render()
}

function keyPressed() {
    if (availableLetters.includes(key)) {
        currentGuess += key
        const i = availableLetters.indexOf(key)
        availableLetters.splice(i, 1)
    }
    if (key == 'Backspace') {
        if (currentGuess.length < 1) return
        const char = currentGuess.slice(-1)
        currentGuess = currentGuess.slice(0, -1)
        availableLetters.push(char)
    }
    if (key == 'Enter' && currentGuess.length >= 3) {
        const score = wordEngine.getWordScore(currentGuess)
        if (score > 0) history.add(currentGuess, score)
        availableLetters = letters.chars.slice(0)
        currentGuess = ''
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