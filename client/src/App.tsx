import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import { StartScreen, LoginScreen, GameScreen } from "./pages";
import HomeScreen from "./pages/HomeScreen";

import * as ClientManager from "./game/ClientManager";

function App() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<StartScreen />} />
				<Route path="/login" element={<LoginScreen />} />
				<Route path="/home" element={<HomeScreen />} />
				<Route path="/game" element={<GameScreen />} />
			</Routes>
		</Router>
	);
}

export default App;
