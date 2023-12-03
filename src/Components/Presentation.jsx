import React from "react";
import styled from "styled-components";

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
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Left = styled.div`
  flex: 2;
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 30px;
  background-color: rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(10px);
  border-radius: 30px;
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.5);
  padding: 40px;
`;

const Title = styled.h1`
  font-size: 2.1rem;
  font-weight: 900;
`;

const SubTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 200;
  display: flex;
  justify-content: center;
`;

const Desc = styled.p`
  color: var(--color-5);
  font-size: 1.4rem;
  font-weight: 200;
`;

const Contact = styled.div`
  display: flex;
  justify-content: space-evenly;
`;

const Icon = styled.img`
  width: 50px;
  cursor: pointer;

`;

const Right = styled.div`
  flex: 3;
  position: relative;
`;

const Img = styled.img`
  height: 35rem;
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

const Presentation = () => {
  return (
    <Section>
      <Container>
        <Left>
          <Title>DESARROLLADOR WEB</Title>
          <SubTitle>-Frontend-</SubTitle>
          <Desc>
            Admirador del diseño y arquitecto de experiencias digitales.
          </Desc>
          <Contact>
            <Icon src="./img/Github.svg" />
            <Icon src="./img/Linkedin.svg" />
            <Icon src="./img/Gmail.svg" />
          </Contact>
        </Left>
        <Right>
          <Img src="./img/img.png" />
        </Right>
      </Container>
    </Section>
  );
};

export default Presentation;
