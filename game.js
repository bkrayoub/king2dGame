let canvas = document.getElementById('myCanvas')
let ctx = canvas.getContext('2d')

canvas.width = 64 * 16 //1024
canvas.height = 64 * 9 // 576

let parsedCollisions
let collistionBlocks
let background
let doors

const player = new Player({
    imageSrc: './media/img/king/idle.png',
    frameRate: 11,
    animations: {
        idleRight: {
            frameRate: 11,
            frameBuffer: 2,
            loop: true,
            imageSrc: './media/img/king/idle.png',

        },
        idleLeft: {
            frameRate: 11,
            frameBuffer: 2,
            loop: true,
            imageSrc: './media/img/king/idleLeft.png',

        },
        runRight: {
            frameRate: 8,
            frameBuffer: 4,
            loop: true,
            imageSrc: './media/img/king/runRight.png',
        },
        runLeft: {
            frameRate: 8,
            frameBuffer: 4,
            loop: true,
            imageSrc: './media/img/king/runLeft.png',
        },
        enterDoor: {
            frameRate: 8,
            frameBuffer: 4,
            loop: false,
            imageSrc: './media/img/king/enterDoor.png',
            onComplete: () => {
                console.log('completed animation')
                gsap.to(overlay, {
                    opacity: 1,
                    onComplete: () => {
                        level++

                        if(level === 4) level = 1
                        levels[level].init()
                        player.switchSprite('idleRight')
                        player.preventInput = false
                        gsap.to(overlay, {
                            opacity: 0
                        })
                    }
                })
            },

        },

    }
})

let level = 1
let levels = {
    1: {
        init: () => {
            parsedCollisions = collisionsLevel1.parse2D()
            collistionBlocks = parsedCollisions.createObjectFrom2D()
            player.collistionBlocks = collistionBlocks
            // ctx.fillStyle = '#fff'
            // ctx.fillRect(0, 0, canvas.width, canvas.height)
            
            
            background = new Sprite({
                position: {
                    x: 0,
                    y: 0
                },
                imageSrc : './media/img/backgroundLevel1.png'
            })
    
            doors = [
                new Sprite({
                    position: {
                        x: 767,
                        y: 270
                    },
                    imageSrc: './media/img/doorOpen.png',
                    frameRate: 5,
                    frameBuffer: 5,
                    loop: false,
                    autoplay: false,
                })
            ]
        }
    },
    2: {
        init: () => {
            parsedCollisions = collisionsLevel2.parse2D()
            collistionBlocks = parsedCollisions.createObjectFrom2D()
            player.collistionBlocks = collistionBlocks
            player.position.x = 96
            player.position.y = 140
            
            if (player.currentAnimation) player.currentAnimation.isActive = false
            
            background = new Sprite({
                position: {
                    x: 0,
                    y: 0
                },
                imageSrc : './media/img/backgroundLevel2.png'
            })
    
            doors = [
                new Sprite({
                    position: {
                        x: 772,
                        y: 448 - 112
                    },
                    imageSrc: './media/img/doorOpen.png',
                    frameRate: 5,
                    frameBuffer: 5,
                    loop: false,
                    autoplay: false,
                })
            ]
        }
    },
    3: {
        init: () => {
            parsedCollisions = collisionsLevel3.parse2D()
            collistionBlocks = parsedCollisions.createObjectFrom2D()
            player.collistionBlocks = collistionBlocks
            player.position.x = 734
            player.position.y = 130
            
            if (player.currentAnimation) player.currentAnimation.isActive = false
            
            background = new Sprite({
                position: {
                    x: 0,
                    y: 0
                },
                imageSrc : './media/img/backgroundLevel3.png'
            })
    
            doors = [
                new Sprite({
                    position: {
                        x: 175.68 ,
                        y: 446.20 - 112
                    },
                    imageSrc: './media/img/doorOpen.png',
                    frameRate: 5,
                    frameBuffer: 5,
                    loop: false,
                    autoplay: false,
                })
            ]
        }
    },
}





const keys = {
    w: {
        pressed: false
    },
    s: {
        pressed: false
    },
    d: {
        pressed: false
    },
    a: {
        pressed: false
    },
    arrowRight: {
        pressed: false
    },
    arrowLeft: {
        pressed: false
    }
 
}

const overlay = {
    opacity: 0,
}

function animate() {
    window.requestAnimationFrame(animate)

    background.draw()

    collistionBlocks.forEach(CollisionBlock => {
        CollisionBlock.draw()
    })

    doors.forEach(door => {
        door.draw()
    })

    player.handleInput(keys)
    player.draw()
    player.update()

    ctx.save()
    ctx.globalAlpha = overlay.opacity
    ctx.fillStyle = 'black'
    ctx.fillRect(0,0,canvas.width,canvas.height)
    ctx.restore()
}
levels[level].init()
animate()

