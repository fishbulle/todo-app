import { useState, type SyntheticEvent } from "react";
import { registerUser } from "../../api/api";
import { StyledButton } from "../../styles/styles";
import { useNavigate } from "react-router";
import { routes } from "../../routes/routes";

{/* TODO: Use zod and react hook form */ }

export default function RegisterForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const navigate = useNavigate()

    async function handleSubmit(event: SyntheticEvent<HTMLFormElement>) {
        event.preventDefault();

        setErrorMessage('');

        if (!username.trim() || !password.trim()) {
            setErrorMessage('Användarnamn och lösenord måste fyllas i.');
            return;
        }

        if (password.length < 8) {
            setErrorMessage('Lösenordet måste vara minst 8 tecken.');
            return;
        }

        try {
            setIsSubmitting(true);

            const response = await registerUser(password, username);

            if (response?.status == 201) {
                navigate(routes.login);
            } else if (response?.status == 409) {
                setErrorMessage('Användarnamnet finns redan registrerat.');
            }

            setUsername('');
            setPassword('');

        } catch (error) {
            setErrorMessage('Kunde inte registrera användaren.');
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
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
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

            {/* TODO: Add password verification (second input) */}

            <StyledButton onClick={() => navigate(routes.start)}>Tillbaka</StyledButton>
            <StyledButton type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Registrerar...' : 'Registrera'}
            </StyledButton>

            {errorMessage && <p>{errorMessage}</p>}
        </form>
    );
}