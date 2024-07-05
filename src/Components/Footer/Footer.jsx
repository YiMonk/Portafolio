import styled from "styled-components";
import { v } from "../../styles/theme";

import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

const Footer = () => {
  return (
    <Section>
      <Container>
        <div className="tittle">
          <h1>Jesus Calles</h1>
          <p>DESARROLADOR FRONT-END</p>
        </div>
        <div className="icons">
          <a href="https://github.com/yimonk" target="_blank">
            <FaGithub />
          </a>
          <a href="https://www.linkedin.com/in/jesus-calles/" target="_blank">
            <FaLinkedin />
          </a>
          <a href="mailto:jactcalles@gmail.com" target="_blank">
            <FaEnvelope />
          </a>
        </div>
      </Container>
    </Section>
  );
};

export default Footer;

//#region {nombre de region}
const Section = styled.div`
  margin-top: 10%;
  padding: 2rem;
  scroll-snap-align: start;
  background-color: #06141b52;
`;

const Container = styled.div`
  scroll-snap-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;

  a {
    text-decoration: none;
    color: inherit;
  }

  .tittle {
    h1 {
      font-size: 2rem;
    }
    p {
      font-size: 1rem;
    }
  }

  .icons {
    transform: scale(2);
    display: flex;
    gap: 4rem;
  }
`;
//#endregion
