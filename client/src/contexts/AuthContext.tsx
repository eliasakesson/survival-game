import react, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext({} as any);

export function useAuth() {
	return useContext(AuthContext);
}

export function AuthProvider({ children }) {
	const [user, setUser] = useState(null);

	useEffect(() => {
		//setUser({
		//	name: "Ezzenix",
		//});
	}, []);

	function login() {}
	function signup() {}
	function logout() {}

	return (
		/* prettier-ignore */
		<AuthContext.Provider value={{user, login, signup, logout}}>
			{children}
		</AuthContext.Provider>
	);
}
