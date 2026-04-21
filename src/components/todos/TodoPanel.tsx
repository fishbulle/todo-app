import { useContext, useEffect, useState, type SyntheticEvent } from "react"
import { AuthContext } from "../../context/AuthContext"
import { createTodo, fetchAllTodosInList, type CreateTodoResponse } from "../../api/api";
import type { CSSProperties } from "styled-components";

export const TodoPanel = (props: { listId: number }) => {
    const { listId } = props;
    const { token } = useContext(AuthContext);
    const [todos, setTodos] = useState<CreateTodoResponse[]>([]);
    const [isLoadingTodos, setIsLoadingTodos] = useState(false);
    const [newTodoTitle, setNewTodoTitle] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const getTodosForList = async () => {
            try {
                const response = await fetchAllTodosInList(listId, token);

                if (response?.status === 200) {
                    setTodos(response.data);
                }
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoadingTodos(false);
            }
        };

        getTodosForList();
    }, [listId, token]);

    async function handleSubmit(event: SyntheticEvent<HTMLFormElement>) {
        event.preventDefault();

        setErrorMessage('');

        if (!listId || !newTodoTitle.trim()) {
            setErrorMessage('Todo måste fyllas i.');
            return;
        }

        try {
            setIsSubmitting(true);

            const response = await createTodo(listId, token, newTodoTitle);

            if (response?.status === 201) {
                console.log('response createTodo', response.data)

                const todosResponse = await fetchAllTodosInList(listId, token);
                if (todosResponse?.status === 200) {
                    setTodos(todosResponse.data);
                }
            }

            setNewTodoTitle('');

        } catch (error) {
            setErrorMessage("Kunde inte spara todo.");
            console.error(error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const completedStyle: CSSProperties = {
        textDecoration: 'line-through'
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div>
                    <input
                        type="text"
                        value={newTodoTitle}
                        onChange={(event) => setNewTodoTitle(event.target.value)}
                        placeholder="Ny todo"
                    />
                    <button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? "Lägger till..." : "Lägg till"}
                    </button>
                </div>
                {errorMessage && <p>{errorMessage}</p>}
            </form>

            {isLoadingTodos ? (
                <p>Laddar todos...</p>
            ) : todos.length === 0 ? (
                <p>Den här listan har inga todos än.</p>
            ) : (
                <ul style={{ listStyleType: 'none' }}>
                    {todos.map((todo) => (
                        <li key={todo.id} style={todo.completed ? completedStyle : {}}>
                            {todo.title}
                        </li>
                    ))}
                </ul>
            )}

        </>
    );
};