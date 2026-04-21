import { useContext, useEffect, useState, type SyntheticEvent } from "react";
import { AuthContext } from "../../context/AuthContext";
import { createTodoList, deleteTodoList, fetchAllTodoLists, type TodoList } from "../../api/api";
import { TodoPanel } from "./TodoPanel";


export const TodoLists = () => {
    const { token } = useContext(AuthContext);
    const [lists, setLists] = useState<TodoList[]>([]);
    const [listName, setListName] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [createListError, setCreateListError] = useState('');
    const [fetchListsError, setFetchListsError] = useState('');
    const [deleteListError, setDeleteListError] = useState('');
    const [deleteListErrorId, setDeleteListErrorId] = useState<number | null>(null);

    useEffect(() => {
        const getAllLists = async () => {
            try {
                const response = await fetchAllTodoLists(token);

                if (response?.status == 200) {
                    setLists(response.data);
                } else {
                    setLists([]);
                }
            } catch {
                setFetchListsError('Kunde inte hämta listor.')
            }
        };

        getAllLists()
    }, [token]);

    async function handleSubmit(event: SyntheticEvent<HTMLFormElement>) {
        event.preventDefault();

        setCreateListError('');

        if (!listName.trim()) {
            setCreateListError('Listnamn måste fyllas i.');
            return;
        }

        try {
            setIsSubmitting(true)

            const response = await createTodoList(listName, token);

            if (response?.status == 201) {
                setLists(prev => [...prev, response.data]);
            }

            setListName('');

        } catch {
            setCreateListError('Kunde inte spara lista.');
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
        } catch {
            setDeleteListErrorId(listId);
            setDeleteListError('Kunde inte radera lista');
        }
    }

    return (
        <>
            <h2>Skapa en ny todo lista</h2>
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
                        {isSubmitting ? 'Skapar lista...' : 'Skapa lista'}
                    </button>
                    {createListError && <p>{createListError}</p>}
                </div>
            </form>

            <br />
            <br />

            <h2>Dina todo listor</h2>

            {fetchListsError && <p>{fetchListsError}</p>}

            {lists.map((item) => (
                <div key={item.id} style={{ borderBottom: '1px solid black', paddingBottom: '2em' }}>
                    <h3>{item.name}</h3>
                    <TodoPanel listId={item.id} />
                    <button onClick={() => handleDeleteList(item.id)}>Radera lista</button>
                    {deleteListErrorId === item.id && <p>{deleteListError}</p>}
                </div>
            ))}

        </>
    );
}