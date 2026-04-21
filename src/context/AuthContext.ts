import { createContext, type Dispatch, type SetStateAction } from "react";

interface IAuthContext {
    username: string;
    setUsername: Dispatch<SetStateAction<string>>;
    token: string;
    setToken: Dispatch<SetStateAction<string>>;
}

const defaultAuthContext: IAuthContext = {
    username: '',
    setUsername: () => { },
    token: '',
    setToken: () => { },
};

export const AuthContext = createContext<IAuthContext>(defaultAuthContext);