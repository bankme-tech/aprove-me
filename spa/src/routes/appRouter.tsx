import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./protectedRoute";

export default function AppRouter() {
	return (
		<Routes>
			{/* <Route path="/login" element={<Login />} /> */}
			{/* <Route
				path="/payables"
				element={
					<ProtectedRoute>
						< />
					</ProtectedRoute>
				}
			/> */}
			{/* <Route
				path="/payables/new"
				element={
					<ProtectedRoute>
						< />
					</ProtectedRoute>
				}
			/> */}
			{/* <Route
				path="/payables/view/:id"
				element={
					<ProtectedRoute>
						< />
					</ProtectedRoute>
				}
			/> */}
			{/* <Route
				path="/assignor/new/"
				element={
					<ProtectedRoute>
						< />
					</ProtectedRoute>
				}
			/> */}
			{/* <Route
				path="/assignor/view/:id"
				element={
					<ProtectedRoute>
						< />
					</ProtectedRoute>
				}
			/> */}
		</Routes>
	)
}