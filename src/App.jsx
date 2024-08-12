import styled from "styled-components";
import { Header } from "./Components/Home/Header";
import { Presentation } from "./Components/Home/Presentation";
import { v } from "./styles/theme";
import AboutMe from "./Components/AboutMe/AboutMe";
import Footer from "./Components/Footer/Footer";
import { Projects } from "./Components/Projects/Projects";

function App() {
  return (
    <Container>
      <Home>
        <Header />
        <Presentation />
      </Home>
      <AboutMe />
      <Projects /> 
      <Footer />
    </Container>
  );
}

export default App;

//#region styles

const Container = styled.div`
  background: ${v.color2};
  color: ${v.color9};
`;

const Home = styled.div`

  @media (max-width: 640px) {
  }
`;

//#endregion
