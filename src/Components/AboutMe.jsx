import React from "react";
import styled from "styled-components";

const Section = styled.div`
  height: 100vh;
  scroll-snap-align: center;
  display: flex;
  justify-content: center;
`;

const Container = styled.div`
  height: 100%;
  scroll-snap-align: center;
  width: 1300px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 5rem;
`;

const Content = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const Left = styled.div`
  flex: 1;
  position: relative;
`;

const Img = styled.img`
  height: 25rem;
  object-fit: contain;
  position: absolute;
  top: 0;
  margin: auto;
  left: 0;
  right: 0;
  bottom: 0;
  animation: animate 2s infinite ease alternate;

  @keyframes animate {
    to {
      transform: translateY(20px);
    }
  }
`;

const Right = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 25px;
  background-color: rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(10px);
  border-radius: 30px;
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.5);
  padding: 50px;
`;

const Title = styled.h1`
  display: flex;
  justify-content: center;
  padding-bottom: 5rem;
  color: var(--color-5);
  font-size: 3rem;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 40px;
`;

const SubTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 200;
  display: flex;
  justify-content: center;
`;

const Desc = styled.p`
  color: var(--color-5);
  font-size: 1rem;
  font-weight: 200;
`;

const AboutMe = () => {
  return (
    <Section>
      <Container>
        <Title>Sobre Mi</Title>
        <Content>
          <Left>
            <Img src="./img/img.png" />
          </Left>
          <Right>
            <SubTitle>Hola! Me llamo Jesus</SubTitle>

            <Desc>
              Soy un entusiasta programador web junior con formación técnica en
              informática. Mi pasión no se limita a la codificación, entre mis
              hobbies estan el diseño gráfico y la creacion de diseños e
              ilustraciones, los videojuegos y el anime.
            </Desc>
          </Right>
        </Content>
      </Container>
    </Section>
  );
};

export default AboutMe;
