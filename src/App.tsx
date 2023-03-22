import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import RootLayout from './pages/Root';
import TodosPage from './pages/Todos';
import './styles/GlobalStyles.css';

function App() {
  const router = createBrowserRouter([
    { path: '/', element: <RootLayout />, children: [{ index: true, element: <TodosPage /> }] },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
