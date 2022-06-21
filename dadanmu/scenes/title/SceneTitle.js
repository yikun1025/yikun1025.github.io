class SceneTitle extends GameScene {
    constructor(game) {
        super(game)
        this.init()

    }
    init() {
        const game = this.game
        this.bg = GameImage.new(game, 'bg')
        this.addElement(this.bg)

        game.registerAction('k', function(){
            const s = new SceneMain(game)
            game.replaceScene(s)
        })
    }
    draw() {
        super.draw()
        this.game.drawText('按 k 开始游戏', 520, 300, {color: "orange", font: '50px serif'})
    }
}
