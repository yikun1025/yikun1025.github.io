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
        bg: 'bird/background.png',
        enemy0: 'img/boss0.png',
        enemy1: 'img/boss1.png',
        enemy2: 'img/boss2.png',
        enemy3: 'img/boss3.png',
        enemy4: 'img/boss4.png',
        fire: 'img/fire.png',
        ground: 'bird/foreground.png',
        pipe: 'bird/pipe-north.png',
        pipe1: 'bird/pipe-south.png',

        bird1: 'img/0bird.png',
        bird2: 'img/1bird.png',
        bird3: 'img/2bird.png',

        title: 'bird/message.png',

        score0: 'bird/0.png',
        score1: 'bird/1.png',
        score2: 'bird/2.png',
        score3: 'bird/3.png',
        score4: 'bird/4.png',
        score5: 'bird/5.png',
        score6: 'bird/6.png',
        score7: 'bird/7.png',
        score8: 'bird/8.png',
        score9: 'bird/9.png',

        //
        // walk1: 'img/古明地觉走路/walk1.png',
        // walk2: 'img/古明地觉走路/walk2.png',
        // walk3: 'img/古明地觉走路/walk3.png',

        // walking4: 'img/古明地觉走路/walk201.png',
        // walking5: 'img/古明地觉走路/walk202.png',
        // walking6: 'img/古明地觉走路/walk203.png',
        // walk31: 'img/古明地觉走路/walk301.png',
        // walk32: 'img/古明地觉走路/walk302.png',
        // walk33: 'img/古明地觉走路/walk303.png',
        // walking10: 'img/古明地觉走路/walk401.png',
        // walking11: 'img/古明地觉走路/walk402.png',
        // walking12: 'img/古明地觉走路/walk403.png',

        // walk1: 'img/古明地觉走路/walk1.png',
        // walk2: 'img/古明地觉走路/walk2.png',
        // walk3: 'img/古明地觉走路/walk3.png',

    }
    const game = Game.new(30, images, function(g){
        var s = new SceneTitle(g)
        log('scene',s, s.draw)
        g.loadScene(s)
    })

    enableDebugMode(game, true)
}

__main()
