import { useEffect, useState } from "react";
import API from "../api/api.js";

function Expenses() {
	const [expenses, setExpenses] = useState([]);

	useEffect(() => {
		API.get("/expenses")
		.then(res => {
			setExpenses(res.data);
		});
	}, []);

	return (
		<div className="p-8">
			<h1 className="text-2xl mb-4">Expenses</h1>
			<table className="w-full">
				<thead>
					<tr className="border-b">
						<th>Description</th>
						<th>Amount</th>
						<th>Category</th>
					</tr>
				</thead>

				<tbody>
					{expenses.map(exp => (
						<tr key={exp.id}>
							<td>{exp.description}</td>
							<td>{exp.amount}</td>
							<td>{exp.category}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}

export default Expenses;