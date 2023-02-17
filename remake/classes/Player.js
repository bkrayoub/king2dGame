class Player {
    constructor(){
        this.position = {
            x: 100,
            y: 200
        }
        this.playerWidth = 50
        this.playerHeight = 80
        this.sides = {
            bottom: this.position.y + this.playerHeight
            // bottom: this.position.x + this.playerWidth

        }
    }
    draw() {
        ctx.fillStyle = '#001070'
        ctx.fillRect(this.position.x, this.position.y, this.playerWidth, this.playerHeight)
    }
    update() {
        if(this.sides.bottom < canvas.height) {
            this.position.y++
            this.sides.bottom = this.position.y + this.playerHeight
        }
    }
}