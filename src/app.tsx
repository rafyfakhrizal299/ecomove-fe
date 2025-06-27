import React from 'react';
import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import createStore from './store';
import routes from './routes';
import Layout from './components/common/Layout';

import 'assets/css/main.css';

const store = createStore();

const appRouter = createBrowserRouter([
  {
    element: <Layout />,
    children: routes,
  },
]);

function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={appRouter} />
    </Provider>
  );
}

export default App;
