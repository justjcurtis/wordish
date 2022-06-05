const pad = 20
class History {
    constructor(historyBox, totalText) {
        this.historyBox = historyBox
        this.totalText = totalText
        this.rows = []
        this.size = 20
        this.words = {}
        this.total = 0
    }

    getHistoryRowHTML(guess, score) {
        return `<div class="historyRow">
            <p class="rowItem">${guess}</p>
            <p class="rowItem">+${score}</p>
        </div>`
    }

    updateHistory() {
        this.historyBox.innerHTML = ''
        for (let i = this.rows.length - 1; i >= 0; i--) {
            const { guess, score } = this.rows[i]
            this.historyBox.innerHTML += this.getHistoryRowHTML(guess, score)
        }
    }

    updateTotal() {
        this.totalText.innerHTML = `Total +${this.total}`
    }

    add(guess, score) {
        if (this.words[guess] != undefined) return
        this.words[guess] = true
        this.rows.push({ guess, score })
        const scores = this.rows.map(v => v.score)
        scores.sort((a, b) => b - a)
        this.total = scores.slice(0, 3).reduce((t, v) => t + v, 0)
        this.updateHistory()
        this.updateTotal()
    }
}