import {jwtDecode} from "jwt-decode";

const TOKEN_KEY = "token";


export function login(token: string) {
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

	return token && !isTokenExpired();
}

export default function isTokenExpired() {
	const token = getToken();
	if (token) {
		interface DecodedToken {
			exp: number;
		}
		localStorage.getItem("token");

		const decodedToken: DecodedToken = jwtDecode(token);
		const currentTimestamp = Math.floor(Date.now() / 1000);
		return decodedToken.exp < currentTimestamp;
	}

	return true;
}

export function getIdByToken() {
	const token = getToken();
	if (token) {
		interface DecodedTokenID {
			id: string;
		}
		localStorage.getItem("token");

		const decodedToken: DecodedTokenID = jwtDecode(token);

		return decodedToken.id;
	}
	return null;
}
export function getNameByToken() {
	const token = getToken();
	if (token) {
		interface DecodedTokenID {
			name: string;
		}
		localStorage.getItem("token");

		const decodedToken: DecodedTokenID = jwtDecode(token);

		return decodedToken.name;
	}
	return null;
}
