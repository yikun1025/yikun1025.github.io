class SceneTitle extends GameScene {
    constructor(game) {
        super(game)

        this.init()
        //
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
        //
        this.skipCount = 4

        // this.setupInputs()


    }

    update(){
      super.update()


      //地面移动

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
    }


    init() {
        const game = this.game
        this.bg = GameImage.new(game, 'bg')
        this.addElement(this.bg)

        var title = GameImage.new(game, 'title')
        this.addElement(title)
        title.x = 100
        title.y = 100

        game.registerAction('k', function(){
            const s = new SceneMain(game)
            game.replaceScene(s)
        })
    }
    draw() {
        super.draw()
        this.game.drawText('按 k 开始游戏', 320, 300, {color: "balck", font: '20px serif'})
    }
}
