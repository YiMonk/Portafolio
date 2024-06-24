import React from "react";
import { FaCode } from "react-icons/fa";
import styled from "styled-components";
import { v } from "../styles/theme";

const Teclonogias = () => {
  return (
    <Section id="works">
      <Container>
        <Title>- Proyectos -</Title>

        <Content>
          <SubTitle> en desarrollo </SubTitle>
          <ContainerCards>
            <Glass data-text="Proximamente" rotate={15}>
              <Icon alt="Proximamente">
                <FaCode />
              </Icon>
            </Glass>

            <Glass data-text="Proximamente" rotate={-15}>
              <Icon alt="Proximamente">
                <FaCode />
              </Icon>
            </Glass>

            <Glass data-text="Proximamente" rotate={25}>
              <Icon alt="Proximamente">
                <FaCode />
              </Icon>
            </Glass>

            <Glass data-text="Proximamente" rotate={-25}>
              <Icon alt="Proximamente">
                <FaCode />
              </Icon>
            </Glass>
          </ContainerCards>
        </Content>
      </Container>
    </Section>
  );
};

export default Teclonogias;

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
  scroll-snap-align: start;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  gap: 50px;
`;

const Icon = styled.div`
  display: flex;
  align-items: center;
  transition: 0.5s;
  transform: scale(9);
  padding-bottom: 4px;
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
    background: ${v.color3};
    display: flex;
    justify-content: center;
    align-items: center;
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

//#endregion
