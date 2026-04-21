import { useContext, useEffect, useState, type SyntheticEvent } from "react"
import { AuthContext } from "../../context/AuthContext"
import { createTodo, fetchAllTodosInList, updateTodo, type Todo } from "../../api/api";
import type { CSSProperties } from "styled-components";

const completedStyle: CSSProperties = {
    textDecoration: 'line-through'
};

export const TodoPanel = (props: { listId: number }) => {
    const { listId } = props;
    const { token } = useContext(AuthContext);
    const [todos, setTodos] = useState<Todo[]>([]);
    const [isLoadingTodos, setIsLoadingTodos] = useState(true);
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
                setTodos(prev => [...prev, response.data]);
            }

            setNewTodoTitle('');

        } catch (error) {
            setErrorMessage('Kunde inte spara todo.');
            console.error(error);
        } finally {
            setIsSubmitting(false);
        }
    };


    async function handleToggleComplete(todo: Todo) {
        try {
            const response = await updateTodo(listId, todo.id, token, !todo.completed, todo.title);

            if (response?.status === 200) {
                setTodos(prev =>
                    prev.map(t => t.id === todo.id ? response.data : t)
                );
            }
        } catch (error) {
            console.error('Kunde inte uppdatera todo.', error);
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="newTodo">Ange ny todo </label>
                    <input
                        id="newTodo"
                        type="text"
                        value={newTodoTitle}
                        onChange={(event) => setNewTodoTitle(event.target.value)}
                        placeholder="Ny todo"
                        required
                    />
                    <button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? 'Lägger till...' : 'Lägg till'}
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
                            <input
                                type="checkbox"
                                checked={todo.completed}
                                onChange={() => handleToggleComplete(todo)}
                            />
                            {todo.title}
                        </li>
                    ))}
                </ul>
            )}

        </>
    );
};