import React from "react";
import styled from "styled-components";

const Section = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 2vh;
`;

const Container = styled.div`
  z-index: 10000;
  position: fixed;
  width: 1300px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  backdrop-filter: blur(5px);
  width: 80%;
`;

const YmLogo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 50px;
  padding-left: 40px;
`;

const Logo = styled.img`
  height: 3rem;
`;

const List = styled.ul`
  display: flex;
  gap: 20px;
  list-style: none;
`;

const ListItem = styled.li`
  cursor: pointer;
  &:hover {
    color: var(--color-1);
  }
`;

const Links = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  padding-right: 40px;
`;

const Navbar = () => {
  return (
    <Section>
      <Container>
        <YmLogo>
          <Logo src="./img/icon.svg" />
        </YmLogo>
        <Links>
          <List>
            <ListItem>Home</ListItem>
            <ListItem>About me</ListItem>
            <ListItem>Works</ListItem>
            <ListItem>Contact</ListItem>
          </List>
        </Links>
      </Container>
    </Section>
  );
};

export default Navbar;
