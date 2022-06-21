class GameAnimation {
    constructor(game) {
        this.game = game
        this.frames = []
        for (let i = 1; i < 3; i++) {
            // let name = 'player'+i
            let name = `walk3${i}`
            let t = this.game.textureByName(name)
            //当一个变量用一会儿就不用的时候,就用一个字母代替
            this.frames.push(t)
        }
        this.texture = this.frames[0]
        this.frameIndex = 0;
        this.frameCount = 7;
        this.x = 500
        this.y = 200
    }

    static new(game) {
        return new this(game)
    }

    update() {
        this.frameCount--
        if (this.frameCount <= 0) {
            this.frameCount = 7
            this.frameIndex = (this.frameIndex + 1) % this.frames.length
            this.texture = this.frames[this.frameIndex]
        }
        //这样使得每三帧切换一次图片
    }

    draw() {
        // log(this.frameIndex)

        var context = this.game.context
        context.save();
        context.drawImage(this.texture, this.x , this.y)
    }

    move(x){
      this.x += x
    }
}
