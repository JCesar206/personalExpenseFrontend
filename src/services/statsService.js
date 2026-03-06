import API from "../api/axios.js";

export const getCategoryStats = () => {
	return API.get("/expenses/stats/category");
};