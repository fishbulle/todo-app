import type { AxiosResponse } from "axios";
import api from "./api-root";

type User = {
    createdAt: string;
    id: string;
    username: string;
};

type LoginResponse = {
    token: string;
    user: User;
};

type CreateListResponse = {
    id: number;
    name: string;
    createdAt: string;
};

type CreateTodoResponse = {
    id: number;
    title: string;
    completed: boolean;
    createdAt: string;
    listId: number;
};

export async function registerUser(
    password: string,
    username: string
): Promise<AxiosResponse<User> | undefined> {
    try {
        const response = await api.post('/users', {
            password,
            username
        });

        return response;
    } catch (error) {
        console.error('Could not create user', error);
    }
}

export async function logIn(
    password: string,
    username: string,
): Promise<AxiosResponse<LoginResponse> | undefined> {
    try {
        const response = await api.post('/sessions', {
            password,
            username
        });

        return response;
    } catch (error) {
        console.error('Could not log in user', error);
    }
}

export async function createTodoList(
    name: string,
    token: string
): Promise<AxiosResponse<CreateListResponse> | undefined> {
    try {
        const response = await api.post(
            '/lists',
            {
                name,
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            }
        );

        return response;
    } catch (error) {
        console.error('Could not create list', error);
    }
}

export async function createTodo(
    listID: number,
    token: string,
    title: string
): Promise<AxiosResponse<CreateTodoResponse> | undefined> {
    try {
        const response = await api.post(
            `/lists/${listID}/todos`,
            {
                title,
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            }
        );

        return response;
    } catch (error) {
        console.error('Could not create todo', error);
    }
}