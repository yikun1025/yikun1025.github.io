class SceneMain extends GameScene {
    constructor(game) {
        super(game)
        this.setup()
        this.setupInputs()
    }

    setup() {
        const game = this.game

        this.score = 0
        this.death = false
        this.bg = GameImage.new(game, 'bg')
        this.addElement(this.bg)

        this.pipe = Pipes.new(game)
        this.addElement(this.pipe)

        this.scoreImage = GameImage.new(game, 'score0')
        this.scoreImage.x = 250
        this.scoreImage.y = 100
        this.addElement(this.scoreImage)

        // //循环移动的地面
        this.grounds = []
        //
        for(var i = 0; i < 30; i++){
          var g = GameImage.new(game, 'ground')
          g.x = i * 19
          g.y = 0
        //
          this.addElement(g)
          this.grounds.push(g)
        }

        this.skipCount = 4



        var bird = GameAnimation.new(game)
        bird.x = 100
        bird.y = 200
        this.bird = bird
        this.addElement(bird)


        this.label = GameLabel.new(game)
        this.label.scene = this



        this.addElement(this.label)


    }

    setupInputs(){
      var self = this

      var bird = this.bird

      self.game.registerAction('j', function(){
        bird.jump()
      })

      self.game.registerAction('d', function(){
        bird.move(2)
      })

      self.game.registerAction('d', function(){
        bird.move(2)
      })
    }

    blow(x, y) {
        const ps = GuaParticleSystem.new(this.game, [x, y])
        this.addElement(ps)
    }


    update() {
        var p = this.pipe.pipes
        this.death = Birdcollision(this.bird, this.pipe.pipes) // 判断小鸟是否碰到了水管或地面并加分
        this.score = ScoreCalculate(this.bird, this.pipe.pipes)

        // this.scoreImage = ScoreImageUpdate(this.score)

        super.update()

        this.skipCount--
        var offset = -5

        if (this.skipCount == 0){
          this.skipCount = 4
          offset =  15
        }

        for(var i = 0; i < 30; i++){
          var g = this.grounds[i]
          g.x += offset
        }
        if (this.death) { //如果已经死亡进入结束界面
            var s = new SceneEnd(this.game)
            this.game.replaceScene(s)
        }
    }
}
