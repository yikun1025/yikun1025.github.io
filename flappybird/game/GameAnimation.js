class GameAnimation {
    constructor(game) {
        this.game = game

        //在这里包含不同情况下的角色动画
        this.animations ={
          idle: [],
        }
        for (let i = 1; i < 4; i++) {
            // let name = 'player'+i
            let name = `bird${i}`
            let t = this.game.textureByName(name)
            //当一个变量用一会儿就不用的时候,就用一个字母代替
            this.animations['idle'].push(t)
        }


        //调用idle动画，通过动画名来调用
        this.animationName = 'idle'
        this.texture = this.frames()[0]

        this.w = this.texture.width
        this.h = this.texture.height

        this.frameIndex = 0;
        this.frameCount = 3;

        this.flipX = false//重力和加速度，小鸟会自动加速
        this.gy = 10
        this.vy = 0

        this.rotation = 0
        this.alpha = 1
    }

    static new(game) {
        return new this(game)
    }

    frames(){
      return this.animations[this.animationName]
    }

    jump(){
      this.vy = -10
      this.rotation = -45
    }

    update() {
        // 更新
        if (this.alpha > 0) {
          this.alpha -= 0.05
        }

        this.y += this.vy
        this.vy += this.gy * 0.2
        var h = 390

        if (this. y > h){
          this.y = h
        }

        //更新角度
        if(this.rotation < 45) {
            this.rotation += 5
        }

        this.frameCount--

        if (this.frameCount == 0) {
            this.frameCount = 3
            this.frameIndex = (this.frameIndex + 1) % this.frames().length
            this.texture = this.frames()[this.frameIndex]
        }
        //这样使得每三帧切换一次图片
    }

    draw() {
      var context = this.game.context
      context.save();
      var w2 = this.w / 2
      var h2 = this.h / 2
      context.translate(this.x + w2, this.y + h2);
      if (this.flipX) {
          context.scale(-1, 1)
      }
      context.globalAlpha = this.alpha

      context.rotate(this.rotation * Math.PI / 180)
      context.translate(-w2, -h2);
      context.drawImage(this.texture, 0, 0)
      context.restore()

    }

    move(x, keyStatus){
      this.flipX = (x < 0)
      this.x += x
    }
}
