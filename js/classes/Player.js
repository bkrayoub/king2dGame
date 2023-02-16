class Player {
    constructor() {
        this.position = {
            x: 100,
            y: 100
        }
        this.velocity = {
            x: 0,
            y: 0
        }
        this.gravity = 1
        this.playerWidth = 80
        this.playerHeight = 80
        this.sides = {
            bottom: this.position.y + this.playerHeight
        }
    }

    draw() {
        ctx.fillStyle = 'red'
        ctx.fillRect(this.position.x, this.position.y, this.playerHeight , this.playerWidth)
    }

    update() {
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
        this.sides.bottom = this.position.y + this.playerHeight

        if(this.sides.bottom + this.velocity.y < canvas.height) {
            this.velocity.y += this.gravity
            
        }
        else {
            this.velocity.y = 0
        }
    }
}
