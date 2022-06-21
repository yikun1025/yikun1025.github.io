const loadLevel = function(game, n) {
    n = n - 1
    const level = levels[n]
    const blocks = []
    for (let i = 0; i < level.length; i++) {
        const p = level[i]
        const b = Block(game, p)
        blocks.push(b)
    }
    return blocks
}

const enableDebugMode = function(game, enable) {
    if(!enable) {
        return
    }
    window.paused = false
    window.addEventListener('keydown', function(event){
        const k = event.key
        if (k == 'p') {
            // 暂停功能
            window.paused = !window.paused
        } else if ('1234567'.includes(k)) {
            // 为了 debug 临时加的载入关卡功能
            // blocks = loadLevel(game, Number(k))
        }
    })
    // 控制速度
    document.querySelector('#id-input-speed').addEventListener('input', function(event) {
        const input = event.target
        // log(event, input.value)
        window.fps = Number(input.value)
    })
}

const __main = function() {
    const images = {
        bullet: 'img/bullet.png',
        // cloud: 'img/cloud.png',
        player: 'img/character.png',
        bg: 'img/universe.png',
        enemy0: 'img/boss0.png',
        enemy1: 'img/boss1.png',
        enemy2: 'img/boss2.png',
        enemy3: 'img/boss3.png',
        enemy4: 'img/boss4.png',
        fire: 'img/fire.png',
    }
    const game = Game.new(30, images, function(g){
        const s = new SceneTitle(g)
        log('scene',s, s.draw)
        g.loadScene(s)
    })

    enableDebugMode(game, true)
}

__main()
