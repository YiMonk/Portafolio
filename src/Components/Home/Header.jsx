import styled from "styled-components";
import logo from "../../assets/ym white.svg";
import { CgClose, CgMenu } from "react-icons/cg";
import { useState } from "react";

import { v } from "../../styles/theme";

export function Header() {
  const [menu, setMenu] = useState(false);

  return (
    <Container menu={menu}>
      <Logo>
        <span>
          <img src={logo} />
        </span>
        <h1>YiMonk</h1>
      </Logo>
      <Nav menu={menu}>
        <span>
          <a href="#SobreMi">Sobre Mi</a>
        </span>

        <span>
          <a href="#Tecnologias">Tecnologias</a>
        </span>
      </Nav>

      <div onClick={() => setMenu(!menu)} className="menus">
        {menu ? <CgClose /> : <CgMenu />}
      </div>
    </Container>
  );
}
//#region estilos
const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1280px;
  width: 80%;
  margin: 0 auto;
  padding: 1.5rem 0;

  @media (max-width: 940px) {
    width: 90%;
  }
  .menus {
    display: none;
  }

  @media (max-width: 800px) {
    .menus {
      font-size: 2rem;
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0.5rem;
      z-index: 100;
    }
  }
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  h1 {
    font-weight: 600;
    font-size: 1.2rem;
  }
`;

const Nav = styled.div`
  @media (max-width: 800px) {
    position: fixed;
    display: flex;
    flex-direction: column;
    background-color: ${v.color4};
    inset: 0;
    justify-content: center;
    align-items: center;
    font-size: 2rem;
    gap: 2rem;
    font-weight: 700;
    height: ${(props) => (props.menu ? "100vh" : 0)};
    transition: height 200ms ease-in-out;
    overflow: hidden;
    z-index: 100;
  }

  span {
    margin-left: 1rem;
    a {
      color: #fff;
      text-decoration: none;
      font-weight: 400;
      position: relative;
      &:before {
        content: "";
        position: absolute;
        left: 0;
        right: 0;
        bottom: -5px;
        height: 2px;
        background-color: #fff;
        transform: scale(0);
        transform-origin: right;
        transition: transform 400ms ease-in-out;
      }
      &:hover:before {
        transform: scale(1);
        transform-origin: left;
      }
      :hover {
        opacity: 0.7;
      }
    }
  }
`;
//#endregion
