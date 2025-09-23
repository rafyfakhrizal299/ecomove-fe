import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import createStore from './store';
import routes from './routes';
import Layout from './components/common/Layout';

import 'assets/css/main.css';
import { logout, rehydrate } from './slices/auth';
import Notification from './components/common/Notification';

const store = createStore();

const appRouter = createBrowserRouter([
  {
    element: <Layout />,
    children: routes,
  },
]);

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      dispatch(rehydrate(token));
    } else {
      dispatch(logout());
    }
  }, []);

  return (
    <>
      <RouterProvider router={appRouter} />
      <Notification />
    </>
  );
}

export default App;
