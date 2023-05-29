import React, { createContext, useContext, useState, useEffect } from "react";

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

	function login(email: string, password: string) {
		return new Promise(async (res, rej) => {
			try {
				const fetched = await fetch(
					"http://localhost:8080/v1/auth/login",
					{
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify({ email, password }),
					}
				);

				const data = await fetched.json();

				if (data.ok) {
					setUser(data.body);
					res(data.body);
				}

				rej(data.body);
			} catch (err: any) {
				rej(err.body);
			}
		});
	}
	function signup(username: string, email: string, password: string) {
		return new Promise(async (res, rej) => {
			try {
				const fetched = await fetch(
					"http://localhost:8080/v1/auth/users",
					{
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify({ username, email, password }),
					}
				);

				const data = await fetched.json();

				if (data.ok) {
					setUser(data.body);
					res(data.body);
				}

				rej(data.body);
			} catch (err: any) {
				rej(err.body);
			}
		});
	}
	function logout() {
		setUser(null);
	}

	return (
		/* prettier-ignore */
		<AuthContext.Provider value={{user, login, signup, logout}}>
			{children}
		</AuthContext.Provider>
	);
}
