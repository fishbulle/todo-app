import { logIn, registerUser } from "./api/api"
import { StyledWrapper } from "./styles/styles"


function App() {

  return (
    <>
      <StyledWrapper>
        <p>Hejsan du din lilla räka!</p>
        <button onClick={() => registerUser('12345678', 'angelina')}>REGISTRERA</button>
        <button onClick={() => logIn('12345678', 'angelina')}>LOGIN</button>
      </StyledWrapper>
    </>
  )
}

export default App
