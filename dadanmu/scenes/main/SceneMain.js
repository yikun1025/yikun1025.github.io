class SceneMain extends GameScene {
    constructor(game) {
        super(game)
        this.setup()
        this.setupInputs()
        this.enemyBlow = this.enemyBlow.bind(this)
        this.bulletBlow = this.bulletBlow.bind(this)
    }

    setup() {
        const game = this.game
        this.numberOfEnemies = 10
        this.score = 0
        this.enemies = []
        this.enemyBullets = []
        this.bg = GameImage.new(game, 'bg')
        // this.cloud = Cloud.new(game, 'cloud')
        this.player =  Player.new(game)//GameImage.new(game, 'player')
        this.player.x = 860
        this.player.y = 250
        this.playerBullets = this.player.bullets
        this.label = GameLabel.new(game)
        this.label.scene = this


        this.addElement(this.bg)
        // this.addElement(this.cloud)
        this.addElement(this.player)
        this.addEnemies()
        this.addElement(this.label)

    }

    setupInputs() {
        const game = this.game
        game.registerAction('a', () => {
            this.player.moveLeft()
        })
        game.registerAction('d', () => {
            this.player.moveRight()
        })
        game.registerAction('w', () => {
            this.player.moveUp()
        })
        game.registerAction('s', () => {
            this.player.moveDown()
        })

        game.registerAction('j', () => {
            this.player.fire()
        })
    }
    addEnemies() {
        const es = []
        for(let i = 0; i < this.numberOfEnemies; i++) {
            const e = Enemy.new(this.game)
            // e.scene = this
            es.push(e)
            this.addElement(e)
        }
        this.enemies = es

    }

    blow(x, y) {
        const ps = GuaParticleSystem.new(this.game, [x, y])
        this.addElement(ps)
    }

    enemyBlow(enemy, bullet) {
        // 更新分数
        this.score += 100

        // 爆炸
        const x = enemy.x
        const y = enemy.y
        this.blow(x, y)

        // enemy 消失
        const enemies = this.enemies
        enemies.forEach((e, index) => {
            // log('kill', e, enemy)
            if(e == enemy) {
                e.y = 1000000
            }
        })

        // 子弹消失
        this.removeElement(bullet)
        removeEle(this.playerBullets, bullet)
    }

    bulletBlow(enemy, player) {
        // 爆炸
        const x = enemy.x
        const y = enemy.y
        this.blow(x, y)

        // 子弹消失
        this.removeElement(player)
        this.removeElement(enemy)
        removeEle(this.playerBullets, player)
        removeEle(this.enemyBullets, enemy)
    }

    combat() {
        let {game, enemies, player, playerBullets,enemyBullets, enemyBlow, bulletBlow} = this

        // player's bullet 与  enemy 相撞
        playerBullets.forEach(function(bullet, bIndex) {
            enemies.forEach(function(enemy) {
                if(collide(bullet, enemy)) {
                    enemyBlow(enemy, bullet, bIndex)
                }
            })
        })

        // player 与 enemy's bullet 相撞
        enemyBullets.forEach(function(bullet) {
            if(collide(player,  bullet)) {
                const s = new SceneEnd(game)
                game.replaceScene(s)
            }
        })

        // player's bullet 与 enemy's bullet 相撞
        enemyBullets.forEach(function(eb) {
            playerBullets.forEach(function(pb) {
                if(collide(eb, pb)) {
                    console.log('collide', collide(eb, eb))
                    bulletBlow(eb, pb)
                }
            })
        })

        // player 与 enemy 相撞
        enemies.forEach((enemy) => {
            if(player.collide(enemy)) {
                const s = new SceneEnd(game)
                game.replaceScene(s)
            }
        })
    }

    update() {
        super.update()
        this.combat()
        // this.cloud.y += 1
    }
}
