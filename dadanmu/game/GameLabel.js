class GameLabel extends GameObject {
    constructor(game) {
        super(game)
        this.game = game
        this.score = 0
        // this.text = `分数： ${this.score}`
        this.context = game.context
    }


    draw() {
        const score = this.score
        this.game.drawText(`分数： ${score}`, 10, 580, {color: 'orange'})
        // this.context.fillStyle = 'orange'
        // this.context.fillText()
    }

    update() {
        this.score = this.scene.score
    }
}
