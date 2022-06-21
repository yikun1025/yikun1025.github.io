

class GameScene extends GameObject {
    constructor(game) {
        super(game)
        this.game = game
        this.elements = []
        this.debugModeEnabled = true
    }
    
    draw() {
        for(let i = 0; i < this.elements.length; i++) {
            const e = this.elements[i]
            // this.game.drawImage(e)
            e.draw()
        }
    }

    addElement(e) {
        e.scene = this
        this.elements.push(e)
    }

    removeElement(ele) {
        const elements = this.elements
        elements.forEach(function(curr, index) {
            if(curr == ele) {
                elements.splice(index, 1)
            }
        })
    }
    update() {
        if(this.debugModeEnabled) {
            for(let i = 0; i < this.elements.length; i++) {
                const e = this.elements[i]
                e.debug && e.debug()
            }
        }

        for(let i = 0; i < this.elements.length; i++) {
            const e = this.elements[i]
            e.update()
        }

    }
}
