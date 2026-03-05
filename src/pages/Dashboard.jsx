import { useEffect, useState } from "react";
import API from "../api/api.js";

function Dashboard() {
	const [balance, setBalance] = useState(0);

	useEffect(() => {
		API.get("/expenses/balance/month")
		.then(res => {
			setBalance(res.data)
		});
	}, []);

	return (
		<div className="p-8">
			<h1 className="text-3xl mb-4">Monthly Balance</h1>

			<div className="bg-green-200 p-4 rounded">
				${balance}
			</div>
		</div>
	);
}

export default Dashboard;