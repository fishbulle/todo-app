import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { TodoLists } from "../components/todos/TodoLists";

export const Dashboard = () => {
    const { username } = useContext(AuthContext);

    return (
        <>
            <p>Inloggad som: {username}</p>

            <TodoLists />
        </>
    );
}
