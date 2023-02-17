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
})

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

    player.velocity.x = 0

    if (keys.d.pressed) player.velocity.x = 5
    else if (keys.a.pressed) player.velocity.x = -5
 
    player.draw()
    player.update()
}
animate()

