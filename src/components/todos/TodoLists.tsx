import { useContext, useEffect, useState, type SyntheticEvent } from "react";
import { AuthContext } from "../../context/AuthContext";
import { createTodoList, fetchAllTodoLists, type CreateListResponse } from "../../api/api";
import { TodoPanel } from "./TodoPanel";
import { StyledButton } from "../../styles/styles";


export const TodoLists = () => {
    const { token } = useContext(AuthContext);
    const [lists, setLists] = useState<CreateListResponse[]>([]);
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

                const createListResponse = await fetchAllTodoLists(token);
                if (createListResponse?.status === 200) {
                    setLists(createListResponse.data);
                }
            }

            setListName('');

        } catch (error) {
            setErrorMessage("Kunde inte spara lista.");
            console.error(error);
        } finally {
            setIsSubmitting(false);
        }
    }


    return (
        <>
            <h4>Skapa en ny todo lista</h4>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="listName">Listans namn</label>
                    <br />
                    <input
                        id="listName"
                        type="text"
                        value={listName}
                        onChange={(event) => setListName(event.target.value)}
                        placeholder="Ange listans namn"
                        required
                    />
                </div>
                <StyledButton type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Skapar lista..." : "Skapa lista"}
                </StyledButton>

                {errorMessage && <p>{errorMessage}</p>}
            </form>

            <h1>Dina todo listor</h1>

            {lists.map((item) => (
                <div key={item.id}>
                    <h3>{item.name}</h3>
                    <TodoPanel listId={item.id} />
                </div>
            ))}

        </>
    );
}