import React from "react";
import styled from "styled-components";

const Section = styled.div`
  scroll-snap-align: start;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const Container = styled.div`
  padding-top: 15%;
  height: 100%;
  scroll-snap-align: center;
  width: 1300px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 5rem;
`;

const Content = styled.div`
  scroll-snap-align: start;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  gap: 50px;
`;

const Icon = styled.img`
  display: flex;
  align-items: center;
  height: 50%;
  padding-bottom: 20%;
  transition: 0.5s;
`;

const Glass = styled.div`
  position: relative;
  width: 200px;
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
  margin: 0 -45px;
  transform: rotate(${(props) => props.rotate}deg);
  font-weight: 600;
  letter-spacing: 3px;

  &::before {
    content: attr(data-text);
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 40px;
    background: rgba(255, 255, 255, 0.05);
    display: flex;
    justify-content: center;
    align-items: center;
    color: var(--color-5);
  }
`;

const ContainerCards = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

  &:hover ${Glass} {
    transform: rotate(0deg);
    margin: 0 25px;
  }
`;

const Title = styled.h1`
  display: flex;
  justify-content: center;
  color: var(--color-5);
  font-size: 3rem;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 40px;
`;

const SubTitle = styled.h1`
  display: flex;
  justify-content: center;
  color: var(--color-5);
  font-size: 2rem;
  font-weight: 500;
  text-transform: uppercase;
  margin-right: 20px;
`;

const Teclonogias = () => {
  return (
    <Section>
      <Container>
        <Title>Tecnologias</Title>

        <Content>
          <SubTitle>- Desarrollo -</SubTitle>
          <ContainerCards>
            <Glass data-text="HTML" rotate={-15}>
              <Icon src="/img/Html.svg" alt="html" />
            </Glass>

            <Glass data-text="CSS" rotate={5}>
              <Icon src="/img/Css.svg" alt="Css" />
            </Glass>

            <Glass data-text="JAVASCRIPT" rotate={25}>
              <Icon src="/img/Js.svg" alt="JavaScript" />
            </Glass>

            <Glass data-text="NODE" rotate={-15}>
              <Icon src="/img/Node.svg" alt="Node" />
            </Glass>

            <Glass data-text="GitHub" rotate={-15}>
              <Icon src="/img/Github.svg" alt="GitHub" />
            </Glass>
          </ContainerCards>
        </Content>

        <Content>
          <SubTitle>- Diseño -</SubTitle>
          <ContainerCards>
            <Glass data-text="Ilustrator" rotate={-15}>
              <Icon src="/img/Ai.svg" alt="Ilustrator" />
            </Glass>

            <Glass data-text="Photoshop" rotate={-15}>
              <Icon src="/img/Ps.svg" alt="Photoshop" />
            </Glass>

            <Glass data-text="Figma" rotate={-15}>
              <Icon src="/img/Figma.svg" alt="Figma" />
            </Glass>
          </ContainerCards>
        </Content>
      </Container>
    </Section>
  );
};

export default Teclonogias;
