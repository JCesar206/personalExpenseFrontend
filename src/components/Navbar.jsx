import { Link, useNavigate } from "react-router-dom";

function Navbar() {
	const navigate = useNavigate();
	const logout = () => {
		localStorage.removeItem("token");
		localStorage.removeItem("refreshToken");
		navigate("/");
	};

	return (
		<div className="bg-gray-900 text-white p-4 flex justify-between">
			<div className="flex gap-6">
				<Link to="/dashboard">Dashboard</Link>
				<Link to="/expenses">Expenses</Link>
			</div>
			<button onClick={logout} className="bg-red-500 px-3 py-1 rounded">Logout</button>
		</div>
	);
}

export default Navbar;