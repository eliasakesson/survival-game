import * as React from "react"
import axios from "axios"
import "./App.css"

function App() {
	async function clicked() {
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
		<>
			<button onClick={clicked}>Send Data</button>
		</>
	)
}

export default App
