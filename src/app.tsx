import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import createStore from './store';
import routes from './routes';
import Layout from './components/common/Layout';

import 'assets/css/main.css';
import { logout, rehydrate } from './slices/auth';

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
      dispatch(logout()); // <-- TAMBAHKAN INI
    }
  }, [dispatch]);

  return (
    // Hanya RouterProvider, tidak ada Provider Redux di sini
    <RouterProvider router={appRouter} />
  );
}

export default App;
