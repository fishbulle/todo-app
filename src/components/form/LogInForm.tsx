import { useContext, useState, type SyntheticEvent } from "react";
import { logIn } from "../../api/api";
import { StyledButton } from "../../styles/styles";
import { useNavigate } from "react-router";
import { routes } from "../../routes/routes";
import { AuthContext } from "../../context/AuthContext";

{/* TODO: Use zod and/or react hook form */ }

export default function LogInForm() {
    const [usernameForm, setUsernameForm] = useState('');
    const [password, setPassword] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const { setToken, setUsername } =
        useContext(AuthContext);

    const navigate = useNavigate()

    async function handleSubmit(event: SyntheticEvent<HTMLFormElement>) {
        event.preventDefault();

        setErrorMessage('');

        if (!usernameForm.trim() || !password.trim()) {
            setErrorMessage('Användarnamn och lösenord måste fyllas i.');
            return;
        }

        try {
            setIsSubmitting(true);

            const response = await logIn(password, usernameForm);

            if (response?.status == 201) {
                setToken(response.data.token);
                setUsername(response.data.user.username);
                navigate(routes.dashboard);
            }
            else if (response?.status == 401) {
                setErrorMessage('Felaktigt användarnamn eller lösenord');
            }

            setUsernameForm('');
            setPassword('');

        } catch (error) {
            setErrorMessage('Kunde inte logga in användaren.');
            console.error(error);
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="username">Användarnamn </label>
                <br />
                <input
                    id="username"
                    type="text"
                    value={usernameForm}
                    onChange={(event) => setUsernameForm(event.target.value)}
                    placeholder="Ange användarnamn"
                    required
                />
            </div>
            <br />
            <div>
                <label htmlFor="password">Lösenord </label>
                <br />
                <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder="Ange lösenord"
                    required
                />
            </div>

            <StyledButton onClick={() => navigate(routes.start)}>Tillbaka</StyledButton>
            <StyledButton type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Loggar in...' : 'Logga in'}
            </StyledButton>

            {errorMessage && <p>{errorMessage}</p>}
        </form >
    );
}