import styled from "styled-components";
import { Column, DefaultImage, Row } from "../../components/element";
import NFT from "../../assets/image/card1.png";
import Button from "../../components/element/button";
import { IoArrowBackSharp } from "react-icons/io5";

const Special = () => {
  return (
    <Wrapper>
      <Back>
        <IoArrowBackSharp />
        back
      </Back>
      <ImageContainer>
        <DefaultImage src={NFT} />
        <ImageTitle>tap/click bill for full embedded NFT</ImageTitle>
      </ImageContainer>
      <InputWrapper>
        <InputContainer>
          <InputContainer>
            <Title>Title</Title>
            <Input value="Stark Stork" />
          </InputContainer>
          <InputContainer>
            <Title>Title</Title>
            <Input value="Stark Stork" />
          </InputContainer>
        </InputContainer>
        <InputContainer>
          <InputContainer>
            <Title>Title</Title>
            <Input value="Stark Stork" />
          </InputContainer>
          <InputContainer>
            <Title>Title</Title>
            <Input value="Stark Stork" />
          </InputContainer>
        </InputContainer>
        <InputContainer>
          <Title>For</Title>
          <Input value="Charity #1" />
        </InputContainer>
      </InputWrapper>
      <ButtonWrapper>
        <Button>Add to Vault</Button>
        <Button>Add to Auctions</Button>
        <Button>Proceed</Button>
      </ButtonWrapper>
    </Wrapper>
  );
};
const Wrapper = styled(Column)`
  gap: 30px;
  align-items: flex-start;
`;
const ImageContainer = styled(Row)`
  gap: 10px;
  align-items: flex-start;
`;
const InputWrapper = styled(Row)`
  gap: 20px;
  align-items: flex-start;
`;
const InputContainer = styled(Column)`
  gap: 15px;
  align-items: flex-start;
`;
const ButtonWrapper = styled(Row)`
  gap: 50px;
  align-items: flex-start;
`;
const Input = styled.input`
  font-weight: 600;
  font-size: 20px;
  background: #eceff0;
  border: 1px solid #dcdfdf;
  border-radius: 2px;
  padding: 10px;
`;
const Title = styled(Row)`
  font-size: 14px;
  color: #888888;
`;
const ImageTitle = styled(Row)`
  font-size: 24px;
`;
const Back = styled(Row)`
  font-size: 20px;
  gap: 10px;
`;
export default Special;
