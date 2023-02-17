class Player {
    constructor({
        collistionBlocks = []
    }) {
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
        this.collistionBlocks = collistionBlocks
        console.log(this.collistionBlocks)
    }

    draw() {
        ctx.fillStyle = 'red'
        ctx.fillRect(this.position.x, this.position.y, this.playerHeight , this.playerWidth)
    }

    update() {
        this.position.x += this.velocity.x
        //chack for horizontal collisions
        for(let i = 0 ; i < this.collistionBlocks.length ; i++){
            const collistionBlock = this.collistionBlocks[i]
            // if a collision exists
            if (this.position.x <= collistionBlock.position.x + collistionBlock.width
                && this.position.x + this.playerWidth >= collistionBlock.position.x
                && this.position.y + this.playerHeight >= collistionBlock.position.y 
                && this.position.y <= collistionBlock.position.y + collistionBlock.height) {
                    if (this.velocity.x < -1) {
                        this.position.x = collistionBlock.position.x + collistionBlock.width + 0.01
                        break
                    }
                    if (this.velocity.x > 1) {
                        this.position.x = collistionBlock.position.x - this.playerWidth -0.01
                        break
                    }
            }
        }
        //apply gravity
        this.position.y += this.velocity.y
        this.sides.bottom = this.position.y + this.playerHeight
        //check for vertical collisions
        for(let i = 0 ; i < this.collistionBlocks.length ; i++){
            const collistionBlock = this.collistionBlocks[i]
            // if a collision exists
            if (this.position.x <= collistionBlock.position.x + collistionBlock.width
                && this.position.x + this.playerWidth >= collistionBlock.position.x
                && this.position.y + this.playerHeight >= collistionBlock.position.y 
                && this.position.y <= collistionBlock.position.y + collistionBlock.height) {
                    if (this.velocity.y < -1) {
                        this.position.y = collistionBlock.position.y + collistionBlock.height + 0.01
                        break
                    }
                    if (this.velocity.y > 1) {
                        this.position.y = collistionBlock.position.y - this.playerHeight -0.01
                        break
                    }
            }
        }

        if(this.sides.bottom + this.velocity.y < canvas.height) {
            this.velocity.y += this.gravity
            
        }
        else {
            this.velocity.y = 0
        }
    }
}
