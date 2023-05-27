import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import { StartScreen, LoginScreen, GameScreen } from "../pages";
import HomeScreen from "../pages/HomeScreen";
import { AuthProvider } from "../contexts/AuthContext";
import { GameProvider } from "../contexts/GameContext";
import { Protected, RouteEnum } from "./ProtectedRoute";
import NotFoundPage from "../pages/NotFoundError";

function App() {
	return (
		<GameProvider>
			<AuthProvider>
				<Router>
					<Routes>
						<Route path="/" element={<StartScreen />} />

						<Route
							path="/login"
							element={
								<Protected requires={RouteEnum.NoUser} fallback="/home">
									<LoginScreen />
								</Protected>
							}
						/>

						<Route path="/game" element={<GameScreen />} />

						<Route
							path="/home"
							element={
								<Protected requires={RouteEnum.HasUser} fallback="/login">
									<HomeScreen />
								</Protected>
							}
						/>

						<Route path="*" element={<NotFoundPage />} />
					</Routes>
				</Router>
			</AuthProvider>
		</GameProvider>
	);
}

export default App;
