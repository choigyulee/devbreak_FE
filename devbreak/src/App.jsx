import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';
import routes from './routes';

import PrivateRoute from './PrivateRoute';

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          {routes.map((route) => {
            if (route.element.props.requiresAuth) {
              return (
                <Route
                  key={route.path}
                  path={route.path}
                  element={<PrivateRoute element={route.element} />}
                />
              );
            }

            // 인증이 필요 없는 라우트는 그냥 element로 렌더링
            return <Route key={route.path} path={route.path} element={route.element} />;
          })}
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
