import { createContext, useState } from "react";
import API from "../api/api.js";

export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const login = async (data) => {
		const response = await API.post("/auth/login", data);

		localStorage.setItem("token", response.data.accessToken);
		localStorage.setItem("refreshToken", response.data.refreshToken);

		setUser(response.data.username);
	};

	const register = async (data) => {
		await API.post("/auth/register", data);
	};

	const logout = () => {
		localStorage.removeItem("token");
		localStorage.removeItem("refreshToken");

		setUser(null);
	};

	return (
		<AuthContext.Provider value={{ user, login, register, logout }}>
			{children}
		</AuthContext.Provider>
	);
};