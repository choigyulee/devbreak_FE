// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { RecoilRoot } from 'recoil';
import routes from './routes';
import PrivateRoute from './PrivateRoute';
import LoginCheck from './components/LoginCheck';

function App() {
  const elements = routes.map((item, index) => {
    if (!item.element) {
      console.error(`Route at index ${index} does not have a valid element.`);
      return null;
    }

    // 로그인 보호된 라우트 처리
    if (item.protected) {
      return (
        <Route
          key={item.path}
          path={item.path}
          element={
            <LoginCheck>
              <PrivateRoute>{item.element}</PrivateRoute>
            </LoginCheck>
          }
        />
      );
    }

    return <Route key={item.path} path={item.path} element={item.element} />;
  });

  return (
    <RecoilRoot>
      <Router>
        <Routes>{elements}</Routes>
      </Router>
    </RecoilRoot>
  );
}

export default App;
