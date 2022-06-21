class Bullet extends GameImage {
    constructor(game) {
        super(game, 'bullet')
        this.init()
    }
    init() {
        this.speed = config.bullet_speed
    }
    update() {
        this.x -= this.speed
    }

    collide(enemy) {
        const a = this
        const b = enemy
        if (aInb(a.x, b.x, b.x + b.w) || aInb(b.x, a.x, a.x + a.w)) {
            if (aInb(a.y, b.y, b.y + b.h) || aInb(b.y, a.y, a.y + a.h)) {
                return true
            }
        }
        return false
    }
}
