import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import { Signup } from './pages/Signup';
import { Login } from './pages/Login';
import Features from './pages/Features';
import RequireAuth from './components/RequireAuth';
import Chatbot from './pages/Chatbot';
import UserDetail from './pages/UserDetail';
import DashBoard from './pages/DashBoard';
import PersistLogin from './components/PersistLogin';
import Advisor from './pages/Advisor';
import Risk from './pages/Risk';
import RiskOutput from './pages/RiskOutput';
import BillAnalysis from './pages/BillAnalysis';
import Home from './pages/Home';

function App() {

  return (
    <Routes>

      <Route element={<PersistLogin />}>
        <Route element={<RequireAuth />}>
          <Route path='/user-detail' element={<UserDetail />} />
        </Route>
      </Route>

      <Route path='/' element={<Layout />}>
        <Route index element={<Home/>} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />

        <Route element={<PersistLogin />}>
          <Route element={<RequireAuth />}>
            <Route path='/service' element={<Features />} />
            <Route path='/service/chatbot' element={<Chatbot />} />
            <Route path='/service/advisor' element={<Advisor />} />
            <Route path='/service/risk' element={<Risk />} />
            <Route path='/service/bill' element={<BillAnalysis/>} />
            <Route path='/service/risk/output' element={<RiskOutput />} />
            <Route path='/dashboard' element={<DashBoard />} />
          </Route>
        </Route>

      </Route>
    </Routes>

  )
}

export default App
