class SceneEnd extends GameScene {
    constructor(game) {
        super(game)
        this.init()
    }

    init() {
        const game = this.game
        this.bg = GameImage.new(game, 'bg')
        this.addElement(this.bg)

        game.registerAction('r', function(){
            const s = SceneTitle.new(game)
            game.replaceScene(s)
        })
    }
    draw() {
        const game = this.game
        super.draw()
        // draw labels
        const style = {font: '20px serif', color: 'balck'}
        game.drawText('游戏结束', 150, 300, style)
        game.drawText('按 r 回到标题', 150, 350, style)
    }
}
