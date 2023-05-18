export default class GameObject {
    ctx
    position
    size
    sprite

    constructor(ctx, pos, size, sprite) {
        this.ctx = ctx
        this.position = pos || { x: 0, y: 0 }
        this.size = size || { x: 100, y: 100 }
        this.sprite = sprite
    }

    Update() {
        // Update logic here
        this.Draw(this.ctx)
    }

    Draw(ctx) {
        if (this.sprite) {
            ctx.drawImage(this.sprite, this.position.x, this.position.y, this.size.x, this.size.y)
        } else {
            ctx.fillStyle = "#000000"
            ctx.fillRect(this.position.x, this.position.y, this.size.x, this.size.y)
        }
    }
}