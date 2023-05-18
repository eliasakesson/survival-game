import "./App.css"
//import * as react from "react"
import axios from "axios"

function App() {
	async function clicked(e) {
		console.log("clicked button")

		try {
			await axios.post("http://localhost:3001/post_name", {
				Cool: true,
			})
		} catch (err) {
			console.warn(err)
		}
	}

	return (
		<div className="App">
			<button onClick={clicked}>Send Data</button>
		</div>
	)
}

/*
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
*/

export default App
