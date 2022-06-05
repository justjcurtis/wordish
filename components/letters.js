const padding = 40
class Letters {
    constructor(chars = [], maxWidth = 480) {
        this.chars = chars
        this.y = padding
        this.maxWidth = maxWidth
        this.x = undefined
        this.letterSize = undefined
        this.tints = []
    }

    wasClicked(I, J) {
        let x = this.x
        for (let i = 0; i < this.chars.length; i++) {
            let y = i < (this.chars.length / 2) ? this.y : this.y + this.letterSize + padding / 2
            if ((I > x && I < x + this.letterSize) && (J > y && J < y + this.letterSize)) {
                if (this.tints.includes(i)) return undefined
                return i
            }
            x += this.letterSize + (padding)
            if (i == (this.chars.length / 2) - 1) x = padding
        }
        return undefined
    }

    addTintToIndex(i) {
        if (this.tints.includes(i)) return
        this.tints.push(i)
    }

    addTintToChar(char) {
        if (!this.chars.includes(char)) return
        for (let i = 0; i < this.chars.length; i++) {
            if (this.chars[i] != char) continue
            if (!this.tints.includes(i)) {
                this.addTintToIndex(i)
                return
            }
        }
    }

    removeTintFromIndex(i) {
        this.tints = this.tints.filter(v => v != i)
    }

    removeTintFromChar(char) {
        if (!this.chars.includes(char)) return
        for (let i = this.chars.length - 1; i >= 0; i--) {
            if (this.chars[i] != char) continue
            if (this.tints.includes(i)) {
                this.removeTintFromIndex(i)
                return
            }
        }
    }

    init() {
        const fullLetter = (this.maxWidth - padding) / (this.chars.length / 2)
        const size = fullLetter - padding
        this.x = padding
        this.letterSize = size
    }

    renderLetter(char, x, y, size, tint = false) {
        push()
        stroke('#E3120B')
        strokeWeight(2)
        noFill()
        square(x, y, size)
        textSize(size * 0.6)
        noStroke()
        fill(tint ? '#333333' : 255)
        text(char.toUpperCase(), x + (size / 3.35), y + (size / 4.5), x + size, y + size)
        pop()
    }

    render() {
        if (this.x == undefined) this.init()
        let x = this.x
        for (let i = 0; i < this.chars.length; i++) {
            let y = i < (this.chars.length / 2) ? this.y : this.y + this.letterSize + padding / 2
            this.renderLetter(this.chars[i], x, y, this.letterSize, this.tints.includes(i))
            x += this.letterSize + (padding)
            if (i == (this.chars.length / 2) - 1) x = padding
        }
    }
}