import styled from "styled-components";
import { Column, DefaultImage, Row } from "./element";
import logo from "../assets/image/logo.png";
import { FaServer, FaWallet, FaTimes } from "react-icons/fa";
import { useState, useRef } from "react";
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";
import { Link } from "react-router-dom";

const Header = () => {
  const [toggle, setToggle] = useState(false);
  const mouseMenu = useRef(null);

  const toggleMenu = () => {
    toggle === false ? setToggle(true) : setToggle(false);
  };
  const closeOpenMenus = (e) => {
    if (mouseMenu.current && toggle && !mouseMenu.current.contains(e.target)) {
      setToggle(false);
    }
  };
  document.addEventListener("mousedown", closeOpenMenus);
  toggle ? disableBodyScroll(document) : enableBodyScroll(document);
  return (
    <Wrapper>
      <WrapperContent>
        <DefaultImage src={logo} />
        <MenuContent>
          <MenuContentItem to="/home#ourstory">Mine</MenuContentItem>
          <MenuContentItem to="/home#map">Pay</MenuContentItem>
          <MenuContentItem to="/home#team">Manage/My Gallery</MenuContentItem>
          <MenuContentItem to="/home#faq">
            Check-in printed bill
          </MenuContentItem>
        </MenuContent>{" "}
        <ButtonGroup>
          {!toggle ? (
            <FaServer onClick={toggleMenu} />
          ) : (
            <Row ref={mouseMenu}>
              <FaTimes onClick={toggleMenu} />
              <DropdownMenu>
                <MenuContent2>
                  <DefaultImage src={logo} />
                  <MenuContentItem to="/home#ourstory">Mine</MenuContentItem>
                  <MenuContentItem to="/home#map">Pay</MenuContentItem>
                  <MenuContentItem to="/home#team">
                    Manage/My Gallery
                  </MenuContentItem>
                  <MenuContentItem to="/home#faq">
                    Check-in printed bill
                  </MenuContentItem>
                </MenuContent2>
              </DropdownMenu>
            </Row>
          )}
        </ButtonGroup>
      </WrapperContent>
    </Wrapper>
  );
};
const Wrapper = styled(Row)`
  background: #fafafa;
  box-shadow: 0px 4px 5px #efefef;
  width: 100%;
`;
const WrapperContent = styled(Row)`
  width: 100%;
  padding: 0px 50px;
  justify-content: space-between;
`;
const MenuContent = styled(Row)`
  gap: 50px;
  @media screen and (max-width: 1000px) {
    display: none;
  }
`;
const ButtonGroup = styled(Row)`
  display: none;
  @media screen and (max-width: 1000px) {
    display: flex;
    gap: 10px;
    font-size: 30px;
  }
`;
const MenuContentItem = styled(Link)`
  line-height: 10px;
  letter-spacing: 0.01em;
  color: #1b5e76;
`;

const MenuContent2 = styled(Column)`
  gap: 50px;
  width: 100%;
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 120px;
  z-index: 3;
  padding: 50px;
  width: 200px;
  right: 0.0001px;
  height: 100vh;
  backdrop-filter: blur(46px);
  box-shadow: rgb(173 181 189 / 12%) 5px -8px 16px;
  transition: all 0.5s ease-in-out 0s;
  font-size: 16px !important;
  background-color: white;
`;
export default Header;
