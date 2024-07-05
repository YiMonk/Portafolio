import styled from "styled-components";
import { v } from "../../styles/theme";
import foto from "../../assets/yo.svg";

import { FaGithub, FaLinkedin, FaEnvelope, FaArrowDown } from "react-icons/fa";

export function Presentation() {
  return (
    <Container id="Home">
        <Texts>
          <h1>Hola, soy Jesus Calles</h1>
          <h4>TSU en informáyica y desarrolador front-end</h4>

          <Social>
            <span className="social-icons">
              <span>
                <a href="https://github.com/yimonk" target="_blank">
                  <p>GitHub</p>
                  <FaGithub className="icono" />
                </a>
              </span>

              <span>
                <a
                  href="https://www.linkedin.com/in/jesus-calles/"
                  target="_blank"
                >
                  <p>Linkedin</p>
                  <FaLinkedin className="icono" />
                </a>
              </span>

              <span>
                <a href="mailto:jactcalles@gmail.com" target="_blank">
                  <p>Contacto</p>
                  <FaEnvelope className="icono" />
                </a>
              </span>

              <span>
                <a href="https://github.com/yimonk" target="_blank">
                  <p>CV</p>
                  <FaArrowDown className="icono" />
                </a>
              </span>
            </span>
          </Social>
        </Texts>

        <Picture>
          <img src={foto} />
        </Picture>

    </Container>
  );
}

//#region styles

const Container = styled.div`
  display: flex;
  gap: 2rem;
  padding-top: 10%;
  width: 80%;
  max-width: 1280px;
  margin: 0 auto;



  @media (max-width: 940px) {
    padding-top: 5%;

    .divi {
    display: flex;
  }
  }

  @media (max-width: 800px) {
    flex-direction: column;
  }
`;

const Texts = styled.div`
  flex: 1;
  padding-top: 5rem;
  h1 {
    font-size: 3rem;
    font-weight: 700;
  }
  h4 {
    font-size: 1rem;
    letter-spacing: 7px;
    font-weight: 300;
  }

  @media (max-width: 940px) {
    h1 {
      font-size: 2.7rem;
      font-weight: 700;
    }
    h4 {
      font-size: 0.95rem;
      letter-spacing: 5px;
    }
  }

  @media (max-width: 800px) {
    padding-top: 0;
    h1 {
      font-size: 2.2rem;
      font-weight: 700;
    }
    h4 {
      font-size: 0.8rem;
      letter-spacing: 5px;
    }
  }
`;

const Social = styled.div`
  margin-top: 5rem;

  .social-icons {
    display: flex;
    align-items: center;
    gap: 3rem;

    span {
      width: 10rem;
      height: 3rem;
      border-radius: 15px;
      background-color: ${v.color3};
      position: relative;
      cursor: pointer;
      box-shadow: 0 0.5rem 1rem -0.25rem ${v.color1};
      &:hover {
        transform: scale(1.15);
        transition: 0.5s ease-in-out;
      }
    }

    a {
      display: flex;
      gap: 0.5rem;
      color: #fff;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      text-decoration: none;
    }
    @media (max-width: 940px) {
      p {
        display: none;
      }
    }
  }
`;

const Picture = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 15rem;
    filter: drop-shadow(15px 30px 5px ${v.color1});
    transition: transform 400ms ease-in-out;
    animation: float 3.5s ease-in-out infinite;
    @media (max-width: 940px) {
      display: flex;
      padding-top: 4rem;
      width: 12rem;
    }
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
`;

//#endregion
