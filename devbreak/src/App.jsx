import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./AuthContext";
import routes from "./routes";
import PrivateRoute from "./components/LoginPageItems/PrivateRoute"

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 상태 관리

  const elements = routes.map((item, index) => {
    if (!item.element) {
      console.error(`Route at index ${index} does not have a valid element.`);
      return null; // element가 없으면 null 반환
    }

    // 로그인 여부에 따라 element를 감싸는 방식 선택
    if (item.protected) {
      const elementWithProps = React.cloneElement(item.element, { isLoggedIn, setIsLoggedIn });
      return (
        <Route
          key={index}
          path={item.path}
          element={<PrivateRoute element={elementWithProps} />}
        />
      );
    } else {
      const elementWithProps = React.cloneElement(item.element, { isLoggedIn, setIsLoggedIn });
      return <Route key={index} path={item.path} element={elementWithProps} />;
    }
  });

  return (
    <AuthProvider value={{ isLoggedIn, setIsLoggedIn }}>
      <Router>
        <Routes>{elements}</Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
