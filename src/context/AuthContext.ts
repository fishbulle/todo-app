import { createContext, type Dispatch, type SetStateAction } from "react";

interface IAuthContext {
    isAuthenticated: boolean;
    setIsAuthenticated: Dispatch<SetStateAction<boolean>>;
    username: string;
    setUsername: Dispatch<SetStateAction<string>>;
    token: string;
    setToken: Dispatch<SetStateAction<string>>;
}

const defaultAuthContext: IAuthContext = {
    isAuthenticated: false,
    setIsAuthenticated: () => { },
    username: '',
    setUsername: () => { },
    token: '',
    setToken: () => { },
};

export const AuthContext = createContext<IAuthContext>(defaultAuthContext);