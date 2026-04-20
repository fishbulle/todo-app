import { useNavigate } from "react-router";
import { StyledButton } from "../styles/styles"
import { routes } from "../routes/routes";

export const StartPage = () => {
    const navigate = useNavigate();

    const logIn = () => {
        navigate(routes.login);
    };

    const register = () => {
        navigate(routes.register);
    };
    return (
        <>
            <h1>Startsida</h1>
            <p>Logga in eller registrera dig för att fortsätta</p>
            <StyledButton onClick={logIn}>Logga in</StyledButton>
            <StyledButton onClick={register}>Registera</StyledButton>
        </>
    )
}