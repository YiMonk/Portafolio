import styled from "styled-components";
import flecha from "../assets/flecha.svg";

import { v } from "../styles/theme";
import foto from "../assets/yo.svg";
import { FaGithub, FaLinkedin, FaEnvelope, FaArrowDown } from "react-icons/fa";

const Presentation = () => {
  return (
    <Section id="home">
      <Container>
        <div className="texto">
          <p className="text1">Hola, soy Jesus Calles</p>
          <p className="text2">TSU en informáyica y desarrolador front-end</p>
        </div>

        <div className="botones">
          <a href="https://github.com/yimonk" target="_blank" className="boton">
            <p>GitHub</p>
            <FaGithub className="icono" />
          </a>
          <a
            href="https://www.linkedin.com/in/jesus-calles/"
            target="_blank"
            className="boton"
          >
            <p>Linkedin</p>
            <FaLinkedin className="icono" />
          </a>
          <a href="https://github.com/yimonk" target="_blank" className="boton">
            <p>CV</p>
            <FaArrowDown className="icono" />
          </a>
          <a href="mailto:jactcalles@gmail.com" target="_blank" className="boton">
            <p>Contacto</p>
            <FaEnvelope className="icono" />
          </a>
        </div>

        <img className="imagen" src={flecha} />
        <img className="imagen2" src={foto} />
      </Container>
    </Section>
  );
};

export default Presentation;

//#region styles

const Section = styled.div`
  height: 100vh;
  scroll-snap-align: center;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const Container = styled.div`
  padding-top: 100px;
  height: 100%;
  scroll-snap-align: center;
  width: 1300px;
  display: grid;
  gap: 20px;
  grid-template:
    "texto imagen" 40%
    "texto imagen" 15%
    "botones imagen" 25%/
    1.5fr 0.5fr;

  a {
    text-decoration: none;
    color: inherit;
  }

  .texto {
    grid-area: texto;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    .text1 {
      font-size: 3.5rem;
      font-weight: 700;
    }
    .text2 {
      font-size: 1.2rem;
      letter-spacing: 5px;
    }
  }

  .imagen {
    margin: 45% 10%;
    grid-area: imagen;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 65vh;
    animation: float 3.5s ease-in-out infinite;
    filter: blur(5px);
  }

  .imagen2 {
    margin: 25% 5px;
    grid-area: imagen;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 65vh;
    animation: float 3.5s ease-in-out infinite;
  }
  @keyframes float {
    0% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-80px);
    }
    100% {
      transform: translateY(0);
    }
  }

  .botones {
    grid-area: botones;
    display: flex;
    justify-content: space-around;
    align-items: center;

    .boton {
      text-transform: uppercase;
      padding: 10px 25px;
      border: none;
      border-radius: 10px;
      font-size: 20px;
      justify-self: center;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: 0.3s ease;
      background-color: ${v.color4};
      color: ${v.color6};
      font-weight: 500;
      letter-spacing: 3px;
      box-shadow: inset 0.04rem 0.04rem 0.5rem ${v.color1},
        inset -0.04rem -0.04rem 0.4rem ${v.color5};

      p {
        padding-right: 15px;
      }

      .icono {
        font-size: 35px;
        border: none;
        letter-spacing: inherit;
        color: inherit;
        text-align: inherit;
        padding: 0;
        font-family: inherit;
        outline: none;
      }
    }
  }
`;

//#endregion
