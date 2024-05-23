import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./protectedRoute";
import Login from "../pages/login";
import NewPayable from "../pages/newPayable";
import ViewPayables from "../pages/viewPayable";
import Payables from "../pages/payables";
import NewAssignor from "../pages/newAssignor";
import ViewAssignor from "../pages/viewAssignor";

export default function AppRouter() {
	return (
		<Routes>
			<Route path="/login" element={<Login />} />
			<Route
				path="/payables"
				element={
					<ProtectedRoute>
						<Payables />
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
				path="/payable/view/:id"
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
						<NewAssignor />
					</ProtectedRoute>
				}
			/>
			<Route
				path="/assignor/view/:id"
				element={
					<ProtectedRoute>
						<ViewAssignor />
					</ProtectedRoute>
				}
			/>
			<Route path="*" element={<Navigate to="/payables/new" />} />
		</Routes>
	)
}