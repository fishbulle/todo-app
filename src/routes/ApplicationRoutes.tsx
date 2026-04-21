import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Route, Routes } from 'react-router';
import { routes } from "./routes";
import { StartPage } from "../pages/Start";
import { LogInPage } from "../pages/LogIn";
import { RegisterPage } from "../pages/Register";
import { Dashboard } from "../pages/Dashboard";

export const ApplicationRoutes = () => {
    const { isAuthenticated } = useContext(AuthContext);

    return (
        <>
            <Routes>
                <Route path={routes.start} element={<StartPage />} />
                <Route path={routes.login} element={<LogInPage />} />
                <Route path={routes.register} element={<RegisterPage />} />
                {isAuthenticated && (
                    <>
                        <Route path={routes.dashboard} element={<Dashboard />} />
                    </>
                )}
            </Routes>
        </>
    );
};