import styled from "styled-components";
import AboutMe from "./Components/AboutMe";
import Contact from "./Components/Contact";
import Presentation from "./Components/Presentation";
import Works from "./Components/Works";
import  Teclonogias  from "./Components/Tecnologias";
import Navbar from "./Components/Navbar";

const Container = styled.div`
  height: 100vh;
  scroll-snap-type: y mandatory;
  scroll-behavior: smooth;
  overflow-y: auto;
  color: var(--color-5);
  background: url("./img/fondo4.jpg");

  background-color: var(--color-2);
  background-repeat: no-repeat;
  background-size: cover;

  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

function App() {
  return (
    <Container>
      <Navbar />
      <Presentation />
      <AboutMe />
      <Teclonogias />
      <Works />
      <Contact />
    </Container>
  );
}

export default App;
