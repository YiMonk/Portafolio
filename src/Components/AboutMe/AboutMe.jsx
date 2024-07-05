import styled from "styled-components";
import { v } from "../../styles/theme";

import {
  RiCss3Fill,
  RiHtml5Fill,
  RiJavascriptFill,
  RiNodejsFill,
  RiReactjsFill,
} from "react-icons/ri";
import { SiAdobeillustrator, SiAdobephotoshop, SiFigma } from "react-icons/si";

const AboutMe = () => {
  return (
    <Container id="SobreMi">
      <p>
        Soy un Desarrollador web con orientación al front-end, mis habilidades
        no se centran solo en el código, sino también he sido freelance como
        diseñador gráfico e ilustración digital. Gran parte de mis conocimientos
        los he adquirido de manera autodidacta.
      </p>

      <Tools id="Tecnologias">
        <h1>Herramientas que manejo</h1>

        <div className="Tools">
          <ul className="contentTools">
            {HerramientasArray.map(({ icon, tittle }) => (
              <li className="card" key={tittle}>
                <span className="text">{tittle}</span>
                <div className="icon">{icon}</div>
              </li>
            ))}
          </ul>
        </div>
      </Tools>
    </Container>
  );
};

export default AboutMe;

//#region Data links
const HerramientasArray = [
  {
    tittle: "JavaScript",
    icon: <RiJavascriptFill />,
  },
  {
    tittle: "HTML",
    icon: <RiHtml5Fill />,
  },
  {
    tittle: "CSS",
    icon: <RiCss3Fill />,
  },
  {
    tittle: "React",
    icon: <RiReactjsFill />,
  },
  {
    tittle: "NodeJs",
    icon: <RiNodejsFill />,
  },
  {
    tittle: "Figma",
    icon: <SiFigma />,
  },
  {
    tittle: "PhotoShop",
    icon: <SiAdobephotoshop />,
  },
  {
    tittle: "Illustrator",
    icon: <SiAdobeillustrator />,
  },
];

//#endregion

//#region {nombre de region}

const Container = styled.div`
  width: 80%;
  max-width: 1280px;
  margin: 0 auto;
  text-align: center;

  p {
    padding-top: 4rem;
    font-size: 1.2rem;
    letter-spacing: 2px;
    line-height: 2;

    @media (max-width: 940px) {
      padding-top: 2rem;
      font-size: 0.9rem;
      letter-spacing: 2px;
      line-height: 1.5;
    }
  }
`;

const Tools = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding-top: 4rem;

  h1 {
    font-size: 2.5rem;
  }

  @media (max-width: 940px) {
    h1 {
      font-size: 1.5rem;
    }
  }

  .Tools {
    max-width: 90vw;
    padding: 20px;

    .contentTools {
      padding-block: 1rem;
      display: flex;
      gap: 1.5rem;
      flex-wrap: wrap;
      justify-content: center;
    }

    .card {
      padding: 0.8rem;
      background: ${v.color3};
      border-radius: 10px;
      box-shadow: 0 0.5rem 1rem -0.25rem ${v.color1};
      display: flex;
      align-items: center;
      justify-content: space-around;
      height: 2.5rem;
      &:hover {
        transform: scale(1.15);
        transition: 0.5s ease-in-out;
      }

      .text {
        letter-spacing: 2px;
        padding: 8px 5px;
      }

      .icon {
        display: flex;
        align-items: cneter;
        font-size: 1.5rem;
        padding: auto 10px;
      }
    }
  }
`;

//#endregion
