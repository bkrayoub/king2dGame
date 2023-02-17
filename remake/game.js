let canvas = document.querySelector('canvas')

let ctx = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576




let player = new Player()

function animation() {
    requestAnimationFrame(animation)

    ctx.fillStyle = '#fff'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    player.draw()
    player.update()

}
animation()

