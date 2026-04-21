import type { AxiosResponse } from "axios";
import api from "./api-root";
import type { Dispatch, SetStateAction } from "react";


export async function registerUser(
    password: string,
    username: string
): Promise<AxiosResponse<{ createdAt: string; id: string; username: string; }> | undefined> {
    try {
        const response = await api.post('/users', {
            password: password,
            username: username
        });

        return response;
    } catch (error) {
        console.error('something went wrong', error);
    }
}

export async function logIn(
    password: string,
    username: string,
    setIsAuthenticated: Dispatch<SetStateAction<boolean>>,
    setToken: Dispatch<SetStateAction<string>>,
    setUsername: Dispatch<SetStateAction<string>>
): Promise<AxiosResponse<{
    token: string;
    user: {
        createdAt: string;
        id: string;
        username: string;
    }
}> | undefined> {
    try {
        const response = await api.post('/sessions', {
            password: password,
            username: username
        });

        if (response.status == 201) {
            setIsAuthenticated(true);
            setToken(response.data.token);
            setUsername(response.data.user.username);
        }

        return response;
    } catch (error) {
        console.error('something went wrong', error);
    }
}

