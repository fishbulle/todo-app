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

export type CreateListResponse = {
    createdAt: string;
    id: number;
    name: string;
    ownerId: number;
};

export type CreateTodoResponse = {
    completed: boolean;
    createdAt: string;
    id: number;
    title: string;
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

export async function fetchAllTodoLists(token: string):
    Promise<AxiosResponse<CreateListResponse[]> | undefined> {
    try {
        const response = await api.get(
            '/lists',
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            }
        );

        return response;
    } catch (error) {
        console.error('Could not fetch lists', error);
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

export async function fetchAllTodosInList(
    listID: number,
    token: string,
): Promise<AxiosResponse<CreateTodoResponse[]> | undefined> {
    try {
        const response = await api.get(
            `/lists/${listID}/todos`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            }
        );

        return response;
    } catch (error) {
        console.error('Could not fetch todos', error);
    }
}

export async function updateTodo(
    listID: number,
    id: number,
    token: string,
    completed: boolean,
    title: string
): Promise<AxiosResponse<CreateTodoResponse> | undefined> {
    try {
        const response = await api.put(
            `/lists/${listID}/todos/${id}`,
            {
                completed,
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
        console.error('Could not update todo', error);
    }
}