class Pipes {
    constructor(game, x) {
        this.game = game
        this.pipes = []
        this.pipeSpace = 150
        this.pipeDistance = 180
        this.columsOfPipe = 3
        for (var i = 0; i < this.columsOfPipe; i++) {
            var p1 = GameImage.new(game, 'pipe')
            p1.flipY = true
            if (x) {
                p1.x =  x[i].x
            } else {
                p1.x = 300 + i * this.pipeDistance
            }
            var p2 = GameImage.new(game, 'pipe')
            p2.x = p1.x
            if (x) {
                this.resetPipesPosition(p1, p2, x[i].y)
            } else {
                this.resetPipesPosition(p1, p2)
            }
            this.pipes.push(p1)
            this.pipes.push(p2)

        }
        window.paused = false
    }
    static new(game) {
        return new this(game)
    }
    resetPipesPosition(p1, p2, y) {
        p1.y = y || randomBetween(-350, -100)
        p2.y = p1.y + p1.h + this.pipeSpace
    }

    update() {
        if (window.pause) {
            return
        }
        for (var i = 0; i < this.pipes.length / 2; i+=2) {
            var p1 = this.pipes[i]
            var p2 = this.pipes[i+1]
            //log("p1.x=", p1.x)
            p1.x -= 5
            p2.x -= 5
            if(p1.x < -100) {
                p1.x += this.pipeDistance * this.columsOfPipe
            }
            if(p2.x < -100) {
                p2.x += this.pipeDistance * this.columsOfPipe
                this.resetPipesPosition(p1, p2)
            }
        }
    }
    draw() {
        var context = this.game.context
        for (var p of this.pipes) {
            context.save();
            var w2 = p.w / 2
            var h2 = p.h / 2
            context.translate(p.x + w2, p.y + h2);
            var scaleX = p.flipX ? -1 : 1
            var scaleY = p.flipY ? -1 : 1
            context.scale(scaleX, scaleY)
            context.rotate(p.rotation * Math.PI / 180)
            context.translate(-w2, -h2);
            context.drawImage(p.texture, 0, 0)
            context.restore()

        }
    }
}
