import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Users from "./pages/UsersPage";
import Donators from "./pages/DonatorsPage";
import LoginRegister from "./pages/AuthPage";
import MainAdmin from "./pages/MainAdminPage";
import RegionalAdmin from "./pages/AdminPage";
import Unauthorized from "./pages/UnauthorizedPage";
import ProtectedRoute from "./context/ProtectedRoute";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginRegister />} />
        <Route path="/unauthorized" element={<Unauthorized />} />

        {/* protected routes */}
        <Route
          path="/main-admin"
          element={
            <ProtectedRoute roles={["admin"]}>
              <MainAdmin />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/regional-admin"
          element={
            <ProtectedRoute roles={["admin"]}>
              <RegionalAdmin />
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
