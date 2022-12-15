import styled from "styled-components";
import { Column, Row } from "./element";

const Footer = () => {
  return (
    <Wrapper>
      <WrapperContext>
        <WrapperContent>
          <LogoContent>
            <div>
              Global<span>Change</span>
            </div>
            <img src="https://static.wixstatic.com/media/0a2685_0f09b9e8c21d460eb9687b3a4f495dcb~mv2.png/v1/fill/w_59,h_47,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/justlogoclear.png" />
          </LogoContent>
          <>Money you can feel good about</>
          <TextContent>
            GlobalChange is not a formal or registered nonprofit. This website
            describes ideas that anyone can implement independently, if they
            want. This website is not seeking to sell anything or solicit money
            or donations to itself.
          </TextContent>
        </WrapperContent>
      </WrapperContext>
    </Wrapper>
  );
};
const Wrapper = styled(Row)`
  width: 100%;
  background-color: rgb(219, 219, 219);
  border-top: 1px solid rgb(160, 160, 159);
`;
const WrapperContext = styled(Row)`
  max-width: 1440px;
  margin: auto;
  width: 100%;
`;
const WrapperContent = styled(Column)`
  font-weight: bold;
  color: #6d6b6b;
  gap: 10px;
  font-size: 18px;
  max-width: 600px;
  width: 100%;
  align-items: flex-start;
  padding-bottom: 50px;
  padding: 50px;
`;
const LogoContent = styled(Row)`
  font-size: 25px;
  font-weight: 500;
  gap: 20px;
  span {
    color: rgb(165, 103, 44);
  }
`;
const TextContent = styled(Row)`
  font-size: 14px;
  font-weight: 400;
`;
export default Footer;
