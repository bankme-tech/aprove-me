import {jwtDecode} from "jwt-decode"

const TOKEN_KEY = "token";

export function login(token) {
	localStorage.setItem(TOKEN_KEY, token);
}

export function logout() {
	localStorage.removeItem(TOKEN_KEY);
}

export function getToken() {
	return localStorage.getItem(TOKEN_KEY);
}

export function isAuthenticated() {
	const token = getToken();

	return token && !isTokenExpired(token);
}

function isTokenExpired(token) {
	localStorage.getItem("token");
	if (token) {
		const decodedToken = jwtDecode(token);
        console.log(decodedToken)
		const currentTimestamp = Math.floor(Date.now() / 1000);
		return decodedToken.exp < currentTimestamp;
	}

	return true;
}
