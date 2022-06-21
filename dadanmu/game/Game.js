
class Game extends GameObject {
    constructor(fps, images, runCallback) {
        super()
        window.fps = fps
        this.images = images
        this.runCallback = runCallback
        //
        this.scene = null
        this.actions = {}
        this.keydowns = {}
        this.canvas = document.querySelector('#id-canvas')
        this.context = this.canvas.getContext('2d')
        // events
        const self = this
        window.addEventListener('keydown', event => {
            this.keydowns[event.key] = true
        })
        window.addEventListener('keyup', function(event){
            self.keydowns[event.key] = false
        })
        this.init()
    }
    
    init() {
        const g = this
        // TODO loads 是一种判断异步加载是否完成的机制
        const loads = []
        // 预先载入所有图片
        const names = Object.keys(g.images)
        for (let i = 0; i < names.length; i++) {
            let name = names[i]
            const path = g.images[name]
            let img = new Image()
            img.src = path
    
            img.onload = function() {
                // 存入 g.images 中
                g.images[name] = img
                // 所有图片都成功载入之后, 调用 run
                loads.push(1)
    
                if (loads.length === names.length) {
                    g.runCallback(g)
                }
            }
        }
    }
    
    drawImage(img) {
        this.context.drawImage(img.texture, img.x, img.y)
    }
    // update
    update() {
        this.scene.update()
    }
    // draw
    draw() {
        // log('draw game')
        this.scene.draw()
    }
    
    runloop() {
        // log(window.fps)
        // events
        const g = this
        const actions = Object.keys(g.actions)
        for (let i = 0; i < actions.length; i++) {
            const key = actions[i]
            if(g.keydowns[key]) {
                // 如果按键被按下, 调用注册的 action
                g.actions[key]()
            }
        }
        // update
        g.update()
        // clear
        g.context.clearRect(0, 0, g.canvas.width, g.canvas.height)
        // draw
        g.draw()
        // next run loop
        setTimeout(function(){
            g.runloop()
        }, 1000/window.fps)
    }
    
    // 使用 Game 载入的素材
    textureByName(name) {
        const g = this
        // log('image by name', g.images)
        const img = g.images[name]
        // log('img', img, img.height)
        // const image = {
        //     w: img.width,
        //     h: img.height,
        //     image: img,
        // }
        return img
    }
    
    loadScene(scene) {
        const g = this
        g.scene = scene
        // 开始运行程序
        setTimeout(function(){
            g.runloop()
        }, 1000/window.fps)
    }
    
    // 供场景调用的方法
    // 绘制文本
    drawText(text, left, top, style={font: '20px serif', color: 'black'}) {
        this.context.font = style.font
        this.context.fillStyle = style.color
        this.context.fillText(text, left, top)
    }
    
    drawRect(rect, style='#554', ) {
        this.context.fillStyle = style
        this.context.fillRect(rect[0], rect[1], rect[2], rect[3])
    }
    
    // 注册按键
    registerAction(key, callback) {
        this.actions[key] = callback
    }
    
    // 替换场景
    replaceScene(scene) {
        this.scene = scene
    }
}
