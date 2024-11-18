// App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import routes from "./routes";
import PrivateRoute from "./PrivateRoute";

function App() {
  const elements = routes.map((item, index) => {
    if (!item.element) {
      console.error(`Route at index ${index} does not have a valid element.`);
      return null;
    }

    if (item.protected) {
      return (
        <Route
          key={item.path}
          path={item.path}
          element={<PrivateRoute>{item.element}</PrivateRoute>}
        />
      );
    }

    return <Route key={item.path} path={item.path} element={item.element} />;
  });

  return (
    <AuthProvider>
      <Router>
        <Routes>{elements}</Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
