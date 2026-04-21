import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../../context/AuthContext"
import { fetchAllTodosInList, type CreateTodoResponse } from "../../api/api";

export const TodoPanel = (props: { listId: number }) => {
    const { listId } = props;
    const { token } = useContext(AuthContext);
    const [todos, setTodos] = useState<CreateTodoResponse[]>([]);

    useEffect(() => {
        const getTodosForList = async () => {
            try {
                const response = await fetchAllTodosInList(listId, token);

                if (response?.status === 200) {
                    setTodos(response.data);
                }
            } catch (error) {
                console.error(error);
            }
        };

        getTodosForList();
    }, [listId, token]);

    return (
        <>
            <h2>Todos</h2>
            {todos.length === 0 ? (
                <p>Inga todos i denna lista ännu.</p>
            ) : (
                todos.map((todo) => (
                    <p key={todo.id}>{todo.title}</p>
                ))
            )}
        </>
    );
};