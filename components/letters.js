const padding = 40
class Letters {
    constructor(chars = [], maxWidth = 480) {
        this.chars = chars
        this.y = padding
        this.maxWidth = maxWidth
        this.x = undefined
        this.letterSize = undefined
    }

    init() {
        const fullLetter = (this.maxWidth - padding) / (this.chars.length / 2)
        const size = fullLetter - padding
        this.x = padding
        this.letterSize = size
    }

    renderLetter(char, x, y, size) {
        push()
        stroke('#E3120B')
        strokeWeight(2)
        noFill()
        square(x, y, size)
        textSize(size * 0.6)
        noStroke()
        fill(255)
        text(char.toUpperCase(), x + (size / 3.35), y + (size / 4.5), x + size, y + size)
        pop()
    }

    render() {
        if (this.x == undefined) this.init()
        let x = this.x
        for (let i = 0; i < this.chars.length; i++) {
            let y = i < (this.chars.length / 2) ? this.y : this.y + this.letterSize + padding / 2
            this.renderLetter(this.chars[i], x, y, this.letterSize)
            x += this.letterSize + (padding)
            if (i == (this.chars.length / 2) - 1) x = padding
        }
    }
}