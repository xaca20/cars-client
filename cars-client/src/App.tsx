import {Route, Routes} from 'react-router';
import RootLayout from './layouts/RootLayout';
import HomePage from './pages/HomePage';
import CarsPage from './pages/CarsPage';
import CarDetailsPage from './pages/CarDetailsPage';
import CreateCarPage from './pages/CreateCarPage';
import EditCarPage from './pages/EditCarPage';
import NotFoundPage from './pages/NotFoundPage';
import LoginPage from './pages/LoginPage';
import ConfirmEmailPage from './pages/ConfirmEmailPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import ProtectedRoute from './components/ProtectedRoute';
import ForgotPasswordPage from './pages/ForgotPasswordPage';

export default function App(){
    return (
        <Routes>
            <Route element={<RootLayout />}>
                <Route
                index
                element={<HomePage />}
                />
                <Route
                path="login"
                element={<LoginPage />}
                />
                <Route
                path="confirm-email"
                element={<ConfirmEmailPage />}
                />
                <Route
                path="reset-password"
                element={<ResetPasswordPage />}
                />
                <Route path="forgot-password"
                element={<ForgotPasswordPage />} 
                />
                <Route element={<ProtectedRoute />}>
                    <Route path="cars">
                        <Route
                        index
                        element={<CarsPage />}
                        />
                        <Route
                        path="new"
                        element={<CreateCarPage />}
                        />
                        <Route
                        path=":id"
                        element={<CarDetailsPage />}
                        />
                        <Route
                        path=":id/edit"
                        element={<EditCarPage />}
                        />
                    </Route>
                </Route>
                <Route
                path="*"
                element={<NotFoundPage />}
                />
            </Route>
        </Routes>
    );
}