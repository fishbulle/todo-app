import { ApplicationRoutes } from "./routes/ApplicationRoutes"
import { colors, StyledWrapper } from "./styles/styles"

function App() {

  return (
    <>
      <h1 style={{ color: colors.wrapperColor }}>TODO APP</h1>
      <StyledWrapper>
        <ApplicationRoutes />
      </StyledWrapper>
    </>
  )
}

export default App
