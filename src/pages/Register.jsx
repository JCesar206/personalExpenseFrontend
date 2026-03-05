import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

function Register() {
	const navigate = useNavigate();
	const { register } = useContext(AuthContext);

	const [form, setForm] = useState({
		username: "",
		email: "",
		password: ""
	});

	const handleChange = (e) => {
		setForm({
			...form,
			[e.target.name]: e.target.value
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			await register(form);
			alert("User created successfully");
			navigate("/");
		} catch (error) {
			console.error("Register error:", error);
			alert("Error creating user");
		}
	};

	return (
		<div className="flex items-center justify-center h-screen bg-gray-100">
			<form onSubmit={handleSubmit} className="bg-white p-8 shadow w-96">
				<h2 className="text-2xl mb-6 text-center">Register</h2>

				<input type="text" name="username" placeholder="Username"
					className="border p-2 w-full mb-4" onChange={handleChange} />
				<input type="email" name="email" placeholder="Email"
					className="border p-2 w-full mb-4" onChange={handleChange} />
				<input type="password" name="password" placeholder="Password"
					className="border p-2 w-full mb-4" onChange={handleChange} />

				<button type="submit" className="bg-green-500 hover:bg-green-700 text-white font-semibold p-2 w-full">
					Create Account</button>
				<p className="text-sm mt-4 text-center">Already have an account?{" "}
					<Link to="/" className="text-blue-500 font-semibold">Login</Link>
				</p>
			</form>
		</div>
	);
}

export default Register;