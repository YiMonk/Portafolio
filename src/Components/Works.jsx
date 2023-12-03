import React from "react";
import styled from "styled-components";

const data = ["Desarrollo", "Diseño", "ilustracion"];

const Section = styled.div`
  height: 100vh;
  scroll-snap-align: center;
  display: flex;
  position: relative;
  justify-content: space-between;
  font-size: 14px;
  font-weight: 300;
  padding-left: 10vh;
`;

const Container = styled.div`
  width: 1400px;
  display: flex;
  justify-content: space-between;
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const List = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const ListItem = styled.li`
  font-size: 90px;
  font-weight: bold;
  cursor: pointer;
  color: transparent;
  -webkit-text-stroke: 1px var(--color-1);
  position: relative;

  &::after {
    content: "${(props) => props.text}";
    position: absolute;
    top: 0;
    left: 0;
    color: var(--color-4);
    width: 0px;
    overflow: hidden;
    white-space: nowrap;
  }

  &:hover {
    -webkit-text-stroke: 0px ;
    &::after {
      animation: movetext 0.5s linear both;
      @keyframes movetext {
        to {
          width: 100%;
        }
      }
    }
  }
`;

const Right = styled.div`
  flex: 1;
`;

const Works = () => {
  return (
    <Section>
      <Container>
        <Left>
          <List>
            {data.map((item) => (
              <ListItem key={item} text={item}>
                {item}
              </ListItem>
            ))}
          </List>
        </Left>
        <Right></Right>
      </Container>
    </Section>
  );
};

export default Works;
