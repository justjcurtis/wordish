const pad = 20
class History {
    constructor(y = 480) {
        this.rows = []
        this.y = y
        this.size = 20
        this.words = {}
        this.total = 0
    }

    add(guess, score) {
        if (this.words[guess] != undefined) return
        this.words[guess] = true
        this.rows.push({ guess, score })
        if (this.rows.length > 5) this.rows = this.rows.slice(1)
        this.total = this.rows.reduce((t, r) => r.score + t, 0)
    }

    renderRow(guess, score, y) {
        push()
        textSize(25)
        noStroke()
        fill(255)
            // square(120, this.y, 240)
        text(guess, 150, y, 240, y + this.size)
        text('+' + score, 300, y, 340, y + this.size)
        pop()
    }

    renderTotal() {
        if (this.total == 0) return
        push()
        textSize(40)
        noStroke()
        fill(255)
            // square(120, this.y, 240)
        text('Total', 135, this.y + 170, 240, this.y + 170 + this.size)
        text('+' + this.total, 290, this.y + 170, 340, this.y + 170 + this.size)
        pop()
    }

    render() {
        push()
        noStroke()
        fill('#333333')
        rect(0, 470, 480, 170)
        pop()
        let y = this.y
        for (let i = this.rows.length - 1; i >= 0; i--) {
            const { guess, score } = this.rows[i]
            this.renderRow(guess, score, y)
            y += this.size + pad / 2
        }
        this.renderTotal()
    }
}