console.log("CLIENT ACTIVATED")

import Player from "./common/Player.js"
import PhysicsWorld from "./common/PhysicsWorld.js"
import CanvasHandler from "./common/CanvasHandler.js"

const physicsWorld = new PhysicsWorld()
const canvasHandler = new CanvasHandler()

function Start(){
	const player = new Player(canvasHandler.ctx, { x: (window.innerWidth / 2) - 50, y: 0 }, { x: 100, y: 100 })
	physicsWorld.AddObject(player)

	requestAnimationFrame(Update)
}

let lastTime = 0
function Update(time){
	const deltaTime = (time - lastTime) * 60 / 1000
	lastTime = time

	canvasHandler.Update()
	physicsWorld.Update(deltaTime)
	
	requestAnimationFrame(Update)
}

Start()