import { BrowserRouter, Routes, Route } from "react-router-dom";
import { StartScreen, LoginScreen, GameScreen } from "./pages";
import HomeScreen from "./pages/HomeScreen";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<StartScreen />} />
				<Route path="/login" element={<LoginScreen />} />
				<Route path="/home" element={<HomeScreen />} />
				<Route path="/game" element={<GameScreen />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
