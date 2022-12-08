import styled from "styled-components";
import { Column, Row } from "../../components/element";
import Currency1 from "../../assets/image/Rectangle 412.png";
const Wallet = () => {
  return (
    <Wrapper>
      <CurrencyContent>
        <CurrnecyGroup>
          The first true digital cash: “NFTs” with face values
          <ImageGroup>
            <ImageWrapper src={Currency1} />
            <ImageWrapper src={Currency1} />
          </ImageGroup>
        </CurrnecyGroup>
        <CurrnecyGroup>
          Get crypto by giving to charity{" "}
          <TextWrapper>
            <span>
              300 GC per CPI basket you give to independent nonprofits
            </span>
            <span>Current CPI = $298.06 </span>
            $1 GC ≈ $1 USD
          </TextWrapper>
        </CurrnecyGroup>
      </CurrencyContent>
    </Wrapper>
  );
};

const Wrapper = styled(Row)`
  width: 100%;
  height: 100%;
  justify-content: center;
  font-family: "Jumbled";
  font-size: 100px;
`;
const CurrencyContent = styled(Row)`
  gap: 10px;
  border: 1px solid #000000;
  box-shadow: 0px 10px 40px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  padding: 10px;
  justify-content: space-between;
`;
const CurrnecyGroup = styled(Column)`
  font-size: 24px;
  font-weight: bold;
  gap: 20px;
  justify-content: flex-start;
  height: 200px;
`;
const ImageGroup = styled(Row)`
  gap: 20px;
  margin: auto;
`;
const ImageWrapper = styled.img`
  gap: 20px;
`;
const TextWrapper = styled(Column)`
  gap: 20px;
`;
export default Wallet;
