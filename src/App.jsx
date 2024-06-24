import styled from "styled-components";
import AboutMe from "./Components/AboutMe";
import Works from "./Components/Works";
import Header from "./Components/Header";
import Presentation from "./Components/Presentation";
import Footer from "./Components/Footer";

import { v } from "./styles/theme";

function App() {
  return (
    <Container>
      <Header />
      <Presentation />
      <AboutMe />
      <Works />
      <Footer />
    </Container>
  );
}

export default App;

//#region styles

const Container = styled.div`
  height: 100vh;
  scroll-snap-type: y mandatory;
  scroll-behavior: smooth;
  overflow-y: auto;
  color: ${v.color6};
  background: ${v.color2};

  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

//#endregion
