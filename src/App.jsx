import Home from './pages/home';
import Offers from './pages/offers';
import Profile from './pages/profile';
import SignUp from './pages/signUp';
import SignIn from './pages/signIn';
import ResetPassword from './pages/resetPassword';

import { Routes, Route } from 'react-router-dom';

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/offers" element={<Offers />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Routes>
    </>
  );
}
