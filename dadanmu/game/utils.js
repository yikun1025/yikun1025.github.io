const e = sel => document.querySelector(sel)

const log = console.log.bind(console)

const imageFromPath = function(path) {
    const img = new Image()
    img.src = path
    return img
}

const rectIntersects = function(a, b) {
    const o = a
    if (b.y > o.y && b.y < o.y + o.image.height) {
        if (b.x > o.x && b.x < o.x + o.image.width) {
            return true
        }
    }
    return false
}


const randomBetween = (start, end) => {
    const n = Math.random() * (end - start + 1)
    return Math.floor(n + start)
}

const collide = (a, b) => {
    if (aInb(a.x, b.x, b.x + b.w) || aInb(b.x, a.x, a.x + a.w)) {
        if (aInb(a.y, b.y, b.y + b.h) || aInb(b.y, a.y, a.y + a.h)) {
            return true
        }
    }
    return false
}

const aInb = function(x, x1, x2) {
    return x >= x1 && x <= x2
}

const removeEle = function(arr, ele) {
    arr.forEach(function(curr, index) {
        if(curr == ele) {
            arr.splice(index, 1)
        }
    })
    return arr
}
