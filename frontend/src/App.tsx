import { Container, CssBaseline } from '@mui/material';
import AppToolbar from './components/UI/AppToolbar/AppToolbar';
import { Route, Routes } from 'react-router-dom';
import Products from './features/products/Products';
import NewProduct from './features/products/NewProduct';
import Register from './features/users/Register';
import Login from './features/users/Login';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import { useAppSelector } from './app/hooks';
import { selectUser } from './features/users/usersSlice';
import EditProduct from './features/products/EditProduct';

const App = () => {
  const user = useAppSelector(selectUser);

  return (
    <>
      <CssBaseline/>
      <header>
        <AppToolbar/>
      </header>
      <main>
        <Container maxWidth="xl">
          <Routes>
            <Route path="/" element={<Products />} />
            <Route path="/products/new" element={(
              <ProtectedRoute isAllowed={user && user.role === 'admin'}>
                <NewProduct />
              </ProtectedRoute>
            )} />
            <Route path="/products/:id/edit" element={(
              <ProtectedRoute isAllowed={user && user.role === 'admin'}>
                <EditProduct />
              </ProtectedRoute>
            )}/>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login/>} />
            <Route path="*" element={<h1>Not found</h1>} />
          </Routes>
        </Container>
      </main>
    </>
  );
};

export default App;
