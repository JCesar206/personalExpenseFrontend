import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Login() {
	const [form, setForm] = useState({
		username: "",
		password: ""
	});

	const { login } = useContext(AuthContext);
	const navigate = useNavigate();
	const handleSubmit = async (e) => {
		e.preventDefault();
		await login(form);
		navigate("/dashboard");
	};

	return (
		<div className="flex items-center justify-center h-screen bg-gray-100">
			<form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow w-80">
				<h2 className="text-2xl mb-4">Login</h2>
				<input className="border p-2 w-full mb-4" placeholder="Username"
					onChange={(e) => setForm({...form, username: e.target.value })} />

				<input type="password" className="border p-2 w-full mb-4" placeholder="Password"
					onChange={(e) => setForm({...form, password: e.target.value })} />
				
				<button className="bg-blue-500 hover:bg-blue-700 text-white font-semibold p-2 w-full cursor-pointer">Login</button>
			</form>
		</div>
	);
}

export default Login;