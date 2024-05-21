import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./protectedRoute";
import Login from "../pages/login";
import NewPayable from "../pages/newPayable";
import ViewPayables from "../pages/viewPayable";

export default function AppRouter() {
	return (
		<Routes>
			<Route path="/login" element={<Login />} />
			<Route
				path="/payables"
				element={
					<ProtectedRoute>
						<span>Pagaveis</span>
					</ProtectedRoute>
				}
			/>
			<Route
				path="/payables/new"
				element={
					<ProtectedRoute>
						<NewPayable />
					</ProtectedRoute>
				}
			/>
			<Route
				path="/payables/view/"
				element={
					<ProtectedRoute>
						<ViewPayables />
					</ProtectedRoute>
				}
			/>
			<Route
				path="/assignor/new/"
				element={
					<ProtectedRoute>
						<span>cadastrar cedente</span>
					</ProtectedRoute>
				}
			/>
			<Route
				path="/assignor/view/:id"
				element={
					<ProtectedRoute>
						<span>cedente</span>
					</ProtectedRoute>
				}
			/>
			<Route path="*" element={<Navigate to="/payables/new" />} />
		</Routes>
	)
}