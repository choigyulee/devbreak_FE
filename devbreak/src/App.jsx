import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import routes from "./routes";
import { AuthProvider } from "./AuthContext"; // AuthContext에서 useAuth 가져오기
import React, { useState } from "react";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 상태 관리

  const elements = routes.map((item, index) => {
    // 각 route에 isLoggedIn prop 전달
    if (!item.element) {
      console.error(`Route at index ${index} does not have a valid element.`);
      return null; // element가 없으면 null 반환
    }
    const elementWithProps = React.cloneElement(item.element, { isLoggedIn, setIsLoggedIn });
    return <Route key={index} path={item.path} element={elementWithProps} />;
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
