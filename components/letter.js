class Letter {
    constructor(char, x, y, size) {
        this.char = char
        this.x = x
        this.y = y
        this.size = size
    }
    render(tint = null) {
        push()
        stroke(255)
        strokeWeight(2)
        noFill()
        square(this.x, this.y, this.size)
        textSize(30)
        textAlign(CENTER, CENTER)
        noStroke()
        fill(255)
        text(this.char, this.x - this.size / 4.5, this.y - this.size / 8, this.x + this.size, this.y + this.size)
        pop()
    }
}