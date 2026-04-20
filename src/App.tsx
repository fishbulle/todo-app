import { colors, StyledButton, StyledWrapper } from "./styles/styles"

function App() {

  return (
    <>
      <h1 style={{ color: colors.wrapperColor }}>TODO APP</h1>
      <StyledWrapper>
        <p>Logga in eller registrera dig för att fortsätta</p>
        <StyledButton>Logga in</StyledButton>
        <StyledButton>Registera</StyledButton>
      </StyledWrapper>
    </>
  )
}

export default App
