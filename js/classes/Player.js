class Player extends Sprite {
    constructor({
        collistionBlocks = [], 
        imageSrc,
        frameRate,
        animations
    }) {
        super({ imageSrc, frameRate, animations })
        this.position = {
            x: 200,
            y: 200
        }
        this.velocity = {
            x: 0,
            y: 0
        }
        this.gravity = 1
        this.sides = {
            bottom: this.position.y + this.height
        }
        this.collistionBlocks = collistionBlocks
        // console.log(this.collistionBlocks)
    }


    update() {
        // ctx.fillStyle = 'rgba(00,00,99,0.5)'
        // ctx.fillRect(
        //     this.position.x, 
        //     this.position.y, 
        //     this.width, 
        //     this.height
        //     )

        this.position.x += this.velocity.x
        this.updateHitBox()
        this.checkForHorizontalCollisions()

        this.applyGravity()

        this.updateHitBox()
        // ctx.fillRect(
        //     this.hitBox.position.x, 
        //     this.hitBox.position.y, 
        //     this.hitBox.width, 
        //     this.hitBox.height
        //     )
        this.checkForVerticalCollisions()

        //check for vertical collisions

    }
    switchSprite(name){
        if(this.image === this.animations[name].image) return
        this.currentFrame = 0
        this.image = this.animations[name].image
        this.frameRate = this.animations[name].frameRate
        this.frameBuffer = this.animations[name].frameBuffer
    }
    updateHitBox() {
        this.hitBox = {
            position: {
                x: this.position.x + 58,
                y: this.position.y + 34
            },
            width: 50,
            height: 53,
        }
    }
    applyGravity() {
        this.velocity.y += this.gravity
        this.position.y += this.velocity.y
    }
    checkForHorizontalCollisions() {
        for(let i = 0 ; i < this.collistionBlocks.length ; i++){
            const collistionBlock = this.collistionBlocks[i]
            // if a collision exists
            if (
                this.hitBox.position.x <= collistionBlock.position.x + collistionBlock.width && 
                this.hitBox.position.x + this.hitBox.width >= collistionBlock.position.x && 
                this.hitBox.position.y + this.hitBox.height >= collistionBlock.position.y && 
                this.hitBox.position.y <= collistionBlock.position.y + collistionBlock.height
                ) {
                    if (this.velocity.x < 0) {
                        const offset = this.hitBox.position.x - this.position.x
                        this.position.x = collistionBlock.position.x + collistionBlock.width - offset + 0.01
                        break
                    }
                    if (this.velocity.x > 0) {
                        const offset = this.hitBox.position.x - this.position.x + this.hitBox.width
                        this.position.x = collistionBlock.position.x - offset -0.01
                        break
                    }
            }
        }
    }
    checkForVerticalCollisions() {
        for(let i = 0 ; i < this.collistionBlocks.length ; i++){
            const collistionBlock = this.collistionBlocks[i]
            // if a collision exists
            if (
                this.hitBox.position.x <= collistionBlock.position.x + collistionBlock.width &&
                this.hitBox.position.x + this.hitBox.width >= collistionBlock.position.x && 
                this.hitBox.position.y + this.hitBox.height >= collistionBlock.position.y && 
                this.hitBox.position.y <= collistionBlock.position.y + collistionBlock.height
                ) {

                    if (this.velocity.y < 0) {
                        this.velocity.y = 0
                        const offset = this.hitBox.position.y - this.position.y
                        this.position.y = collistionBlock.position.y + collistionBlock.height - offset + 0.01
                        break
                    }
                    if (this.velocity.y > 0) {
                        this.velocity.y = 0
                        const offset = this.hitBox.position.y - this.position.y + this.hitBox.height
                        this.position.y = collistionBlock.position.y - offset -0.01
                        break
                    }
            }
        }
    }
}
