window.addEventListener('keydown', (event)=> {
    console.log(event.key)
    switch (event.key) {
        case 'w':
        //jump
            if (player.velocity.y === 0) player.velocity.y = -20
        break
        case ' ':
            //jump
                if (player.velocity.y === 0) player.velocity.y = -20
            break
        case 'a':
        //move to th left
        keys.a.pressed = true
        break
        case 'd':
        //move to th right
        keys.d.pressed = true
        break
        case 's':
        //duck or whatever

        break
    }
})

window.addEventListener('keyup', (event)=> {
    
    switch (event.key) {
        case 'a':
        //move to th left
        keys.a.pressed = false
        break

        case 'd':
        //move to th right
        keys.d.pressed = false
        break
    }
})