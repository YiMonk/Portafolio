import styled from "styled-components";
import ymw from "../assets/ym white.svg";
import { v } from "../styles/theme";

const Navbar = () => {
  return (
    <Section>
      <Container>
        <a href="#home" className="logo">
          <img className="v" src={ymw} />
          <h1 className="title">yimonk</h1>
        </a>

        <div className="logo">
          <a href="#aboutMe" className="subtittle">
            Sobre mi
          </a>
          <div className="divider">|</div>
          <a href="#works" className="subtittle">
            Proyectos
          </a>
        </div>
      </Container>
    </Section>
  );
};

export default Navbar;

//#region Styles

const Section = styled.section`
  display: flex;
  justify-content: center;
  padding-top: 2vh;
`;

const Container = styled.div`
  position: fixed;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  width: 80%;

  a {
    text-decoration: none; /* quita el subrayado */
    color: inherit;
  }

  .logo {
    display: flex;
    justify-content: space-around;
    align-items: center;
    .title {
      padding-left: 10px;
      letter-spacing: 5px;
      font-size: 1rem;
    }
    .subtittle {
      letter-spacing: 2px;
      font-size: 1rem;
    }
    .divider {
      height: 100%;
      width: 2px;
      margin: 0 20px;
      cursor: default;
    }
  }
`;

//#endregion
