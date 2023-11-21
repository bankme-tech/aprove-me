'use client'

import Login from "../components/Login/Login";
import Navbar from "../components/Navbar/navbar";


export default function Home() {
	return (
		<main className="flex min-h-screen flex-col items-center justify-between p-24">
			<Navbar/>
			<Login />			
			
		</main>
	);
}
