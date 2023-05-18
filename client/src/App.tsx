import { BrowserRouter, Routes, Route } from "react-router-dom";
import { StartScreen } from "./pages";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<StartScreen />} />
				<Route path="/signin" element={<h1>Sign In</h1>} />
				<Route path="/menu" element={<h1>Menu</h1>} />
				<Route path="/game" element={<h1>Game</h1>} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;

// import axios from "axios";

// async function clicked() {
// 	console.log("clicked button");

// 	try {
// 		await axios.post("http://localhost:3001/post_name", {
// 			Cool: true,
// 		});
// 	} catch (err) {
// 		console.warn(err);
// 	}
// }
