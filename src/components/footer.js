import styled from "styled-components";
import { Column, DefaultImage, Row } from "./element";

const Footer = () => {
  return (
    <Wrapper>
      <WrapperContent>
        <LogoContent>
          <div>
            Global<span>Change</span>
            <DefaultImage></DefaultImage>
          </div>
        </LogoContent>
        <>Money you can feel good about</>
      </WrapperContent>
      <TextContent>
        This webapp seeks to adhere to the GlobalChange Whitepaper
        <div>
          https://gateway.pinata.cloud/ipfs/QmRTVCwiQ1ZyaBM3sup1TFgUXGeN3FNr2ZZ1yjx8kA5njf
        </div>
      </TextContent>
    </Wrapper>
  );
};
const Wrapper = styled(Row)`
  width: 100%;
  background-color: rgb(219, 219, 219);
  border-top: 1px solid rgb(160, 160, 159);
  gap: 10px;
  justify-content: space-around;
  @media screen and (max-width: 550px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const WrapperContent = styled(Column)`
  font-weight: bold;
  color: #6d6b6b;
  gap: 10px;
  font-size: 18px;
  align-items: flex-start;
  padding: 20px 50px;
`;
const LogoContent = styled(Row)`
  font-size: 25px;
  font-weight: 500;
  gap: 20px;
  span {
    color: rgb(165, 103, 44);
  }
`;
const TextContent = styled.div`
  font-size: 14px;
  word-break: break-all;
  padding: 20px 50px;
`;
export default Footer;
