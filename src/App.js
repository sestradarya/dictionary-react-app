import { BrowserRouter } from "react-router-dom";
import styled from "styled-components";
import "./App.css";
import PageButtons from "./components/PageButtons";
import { Pages } from "./pages/Pages";

function App() {
  return (
    <div className="App">
      <Container>
        <BrowserRouter>
          <PageButtons />
          <Pages />
        </BrowserRouter>
      </Container>
    </div>
  );
}



const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  padding: 1rem;
`;

export default App;
