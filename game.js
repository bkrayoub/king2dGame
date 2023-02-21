let canvas = document.getElementById('myCanvas')
let ctx = canvas.getContext('2d')

canvas.width = 64 * 16 //1024
canvas.height = 64 * 9 // 576


const parsedCollisions = collisionsLevel1.parse2D()
const collistionBlocks = parsedCollisions.createObjectFrom2D()

ctx.fillStyle = '#fff'
ctx.fillRect(0, 0, canvas.width, canvas.height)


const backgroundLevel1 = new Sprite({
    position: {
        x: 0,
        y: 0
    },
    imageSrc : './media/img/backgroundLevel1.png'
})
const player = new Player({
    collistionBlocks,
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
            },
        },

    }
})

const doors = [
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


function animate() {
    window.requestAnimationFrame(animate)

    backgroundLevel1.draw()

    collistionBlocks.forEach(CollisionBlock => {
        CollisionBlock.draw()
    })

    doors.forEach(door => {
        door.draw()
    })

    player.handleInput(keys)
    player.draw()
    player.update()
}
animate()

