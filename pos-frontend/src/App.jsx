import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Home, Auth, Orders, Tables } from "./pages";
import Header from './components/shared/Header';
import Menu from './pages/Menu';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import useLoadData from './hooks/useLoadData';
import FullScreenLoader from './components/shared/FullScreenLoader';
import Dashboard from './pages/Dashboard';

function Layout() {

  const location = useLocation();
  const isLoading = useLoadData();
  const hideHeaderRoutes = ["/auth"];
  const isAuth = useSelector(state => state.user?.isAuth);

  if(isLoading)return <FullScreenLoader />

  return (
    <>
      {!hideHeaderRoutes.includes(location.pathname) && <Header />}
      <Routes>
        <Route path="/" element={
          <ProtectedRoutes>
            <Home />
          </ProtectedRoutes>
        } />
        <Route path="/auth" element={isAuth ? <Navigate to="/" /> : <Auth />} />
        <Route path="/orders" element={
          <ProtectedRoutes>
            <Orders />
          </ProtectedRoutes>
        } />
        <Route path="/tables" element={
          <ProtectedRoutes>
            <Tables />
          </ProtectedRoutes>
        } />
        <Route path="/menu" element={
          <ProtectedRoutes>
            <Menu />
          </ProtectedRoutes>
        } />
        <Route path="/dashboard" element={
          <ProtectedRoutes>
            <Dashboard />
          </ProtectedRoutes>
        } />
        <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>

    </>
  )
}

function ProtectedRoutes({children}){

  const { isAuth } = useSelector(state => state.user);
  if(!isAuth){
    return <Navigate to='/auth' />
  }

  return children;
}


function App() {
  return (

    <Router>
      <Layout />
    </Router>

  )
}

export default App
