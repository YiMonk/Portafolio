import React, { useEffect, useState } from "react";
import { FaCode } from "react-icons/fa";
import styled from "styled-components";
import { v } from "../../styles/theme";

export function Projects() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetch("https://api.github.com/users/yimonk/repos")
      .then((response) => response.json())
      .then((data) => setProjects(data));
  }, []);

  return (
    <>
      {projects.length >= 1 ? (
        <Section id="works">
          <Container>
            <Title>- Proyectos -</Title>
            <Content>
              {projects.map((project) => (
                <ContainerCards key={project.name}>
                  <Glass
                    data-text={project.name}
                    href={project.homepage}
                    target="_blank"
                  >
                    <Icon
                      alt="Proximamente"
                      href={project.html_url}
                      target="_blank"
                    >
                      <FaCode />
                    </Icon>
                  </Glass>
                </ContainerCards>
              ))}
            </Content>
          </Container>
        </Section>
      ) : (
        <p>Hubo un error al cargar los proyectos</p>
      )}
    </>
  );
}

//#region  style

const Section = styled.div`
  padding-top: 10%;
  scroll-snap-align: start;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const Container = styled.div`
  height: 100%;
  scroll-snap-align: center;
  width: 80%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 5rem;
`;

const Content = styled.div`
  padding-block: 1rem;
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: space-around;
`;

const Icon = styled.a`
  display: flex;
  align-items: center;
  transition: 0.5s;
  transform: scale(9);
  padding-bottom: 4px;
  display: flex;
  color: #fff;
  text-decoration: none;
`;

const Glass = styled.a`
  position: relative;
  min-width: 250px;
  height: 240px;
  background: linear-gradient(rgba(0, 0, 0, 0.25), transparent);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 25px 25px rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(10px);
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 0.5s;
  border-radius: 10px;
  font-weight: 600;
  letter-spacing: 3px;

  &::before {
    content: attr(data-text);
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 40px;
    background: ${v.color3};
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const ContainerCards = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1rem;
`;

const Title = styled.h1`
  display: flex;
  justify-content: center;
  color: var(--color-5);
  font-size: 3rem;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 40px;

  @media (max-width: 640px) {
    font-size: 1rem;
    letter-spacing: 10px;
  }

`;



//#endregion

// <Section id="works">
// <Container>
//   <Title>- Proyectos -</Title>

//   <Content>
//     <SubTitle> en desarrollo </SubTitle>
//     <ContainerCards>
//       <Glass data-text="Proximamente" rotate={15}>
//         <Icon alt="Proximamente">
//           <FaCode />
//         </Icon>
//       </Glass>

//     </ContainerCards>
//   </Content>
// </Container>
// </Section>
