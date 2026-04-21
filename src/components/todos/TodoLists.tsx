import { useContext, useEffect, useState, type SyntheticEvent } from "react";
import { AuthContext } from "../../context/AuthContext";
import { createTodoList, deleteTodoList, fetchAllTodoLists, type TodoList } from "../../api/api";
import { TodoPanel } from "./TodoPanel";


export const TodoLists = () => {
    const { token } = useContext(AuthContext);
    const [lists, setLists] = useState<TodoList[]>([]);
    const [listName, setListName] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const getAllLists = async () => {
            try {
                const response = await fetchAllTodoLists(token);

                if (response?.status == 200) {
                    setLists(response.data);
                }
                else return [];
            } catch (error) {
                console.error(error);
            }
        };

        getAllLists()
    }, [token]);

    async function handleSubmit(event: SyntheticEvent<HTMLFormElement>) {
        event.preventDefault();

        setErrorMessage('');

        if (!listName.trim()) {
            setErrorMessage('Listnamn måste fyllas i.');
            return;
        }

        try {
            setIsSubmitting(true)

            const response = await createTodoList(listName, token);

            if (response?.status == 201) {
                console.log(response.data);
                setLists(prev => [...prev, response.data]);
            }

            setListName('');

        } catch (error) {
            setErrorMessage("Kunde inte spara lista.");
            console.error(error);
        } finally {
            setIsSubmitting(false);
        }
    }

    async function handleDeleteList(listId: number) {
        try {
            const response = await deleteTodoList(listId, token);

            if (response?.status === 204) {
                setLists(prev => prev.filter(list => list.id !== listId));
            }

        } catch (error) {
            console.error("Kunde inte uppdatera todo.", error);
        }
    }

    return (
        <>
            <h4>Skapa en ny todo lista</h4>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="listName">Listans namn </label>
                    <input
                        id="listName"
                        type="text"
                        value={listName}
                        onChange={(event) => setListName(event.target.value)}
                        placeholder="Ange listans namn"
                        required
                    />

                    <button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? "Skapar lista..." : "Skapa lista"}
                    </button>

                    {errorMessage && <p>{errorMessage}</p>}
                </div>
            </form>

            <br />
            <br />

            <h1>Dina todo listor</h1>

            {lists.map((item) => (
                <div key={item.id} style={{ borderBottom: '1px solid black', paddingBottom: '10px' }}>
                    <h3>{item.name}</h3>
                    <TodoPanel listId={item.id} />
                    <button onClick={() => handleDeleteList(item.id)}>Radera lista</button>
                </div>
            ))}

        </>
    );
}