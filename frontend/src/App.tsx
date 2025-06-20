import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Users from "./pages/Users";
import Donators from "./pages/Donators";
import LoginRegister from "./pages/LoginRegister";
import AdminDashboard from "./pages/AdminDashboard";
import Unauthorized from "./pages/Unauthorized";
import ProtectedRoute from "./context/ProtectedRoute";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginRegister />} />
        <Route path="/unauthorized" element={<Unauthorized />} />

        {/* protected routes */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute roles={["admin"]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/user"
          element={
            <ProtectedRoute roles={["user"]}>
              <Users />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/donator"
          element={
            <ProtectedRoute roles={["user"]}>
              <Donators />
            </ProtectedRoute>
          }
        ></Route>

        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;
