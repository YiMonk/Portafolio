import React from "react";
import styled from "styled-components";

const Section = styled.div`
  height: 100vh;
  scroll-snap-align: center;
`;

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  gap: 50px;
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end; 
`;

const Title = styled.h1`
  font-weight: 400;
`;

const Form = styled.form`
  width: 500px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Input = styled.input`
  padding: 20px;
  background-color: var(--color-5);
  border-radius: 5px;
  cursor: pointer;
`;

const TextArear = styled.textarea`
  padding: 20px;
  background-color: var(--color-5);
  border-radius: 5px;
`;

const Button = styled.button`
  padding: 10px;
  font-weight: 800;
  background-color: var(--color-4);
  color: var(--color-1);
  border-radius: 5px;
  cursor: pointer;
  border: none;
`;

const Right = styled.div`
  flex: 1;
`;

const Contact = () => {
  return (
    <Section>
      <Container>
        <Left>
          <Form>
            <Title>Contactame</Title>
            <Input placeholder="Name"></Input>
            <Input placeholder="Email"></Input>
            <TextArear placeholder="Escribe un mensaje" rows={10}></TextArear>
            <Button>Send</Button>
          </Form>
        </Left>
        <Right></Right>
      </Container>
    </Section>
  );
};

export default Contact;
