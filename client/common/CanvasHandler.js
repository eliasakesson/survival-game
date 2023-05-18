export default class CanvasHandler {
    constructor() {
        this.canvas = document.getElementById("canvas")
        this.canvas.width = window.innerWidth
        this.canvas.height = window.innerHeight

        this.ctx = this.canvas.getContext("2d")
    }

    Update() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    }
}