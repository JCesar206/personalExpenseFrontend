import axios from "axios";

const API = axios.create({
	baseURL: "http://localhost:8080/api",
});

/* Request interceptor -> Agrega JWT a cada request */
API.interceptors.request.use(
	(config) => {
		const token = localStorage.getItem("token");

		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
			console.log("JWT attached to request");
		}
		return config;
	},

	(error) => {
		console.error("Request error:", error);
		return Promise.reject(error);
	}
);

/* Response Interceptor -> Refresca token si expira */
API.interceptors.response.use(
	(response) => {
		return response;
	},
	async (error) => {
		const originalRequest = error.config;

		if (error.response && error.response.status === 401 && !originalRequest._retry) {
			originalRequest._retry = true;
			console.warn("Access token expired. Trying refresh...");

			try {
				const refreshToken = localStorage.getItem("refreshToken");
				const res = await axios.post("http://localhost:8080/api/auth/refresh",{
					refreshToken: refreshToken,
				});

				const newAccessToken = res.data.accessToken;
				console.log("New access token received");
				localStorage.setItem("token", newAccessToken);

				API.defaults.headers["Authorization"] = `Bearer ${newAccessToken}`;
				return API(originalRequest);
			} catch (refreshToken) {
				console.error("Refresh token expired. Loggin out.");
				localStorage.removeItem("token");
				localStorage.removeItem("refreshToken");

				window.location.href = "/";
				return Promise.reject(refreshError);
			}
		}
		return Promise.reject(error);
	}
);

export default API;