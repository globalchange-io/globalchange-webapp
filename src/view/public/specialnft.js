import styled from "styled-components";
import { Column, DefaultImage, Row } from "../../components/element";
import onegc from "../../assets/image/1GC.gif";
import fivegc from "../../assets/image/5GC.gif";
import tengc from "../../assets/image/10GC.gif";
import twengc from "../../assets/image/20GC.gif";
import fivtygc from "../../assets/image/50GC.gif";
import hundredgc from "../../assets/image/100GC.gif";
import thougc from "../../assets/image/1000GC.gif";
import hundredthougc from "../../assets/image/100000GC.gif";
import miliongc from "../../assets/image/1000000GC.gif";
import coinimage from "../../assets/image/default.jpg";
import Button from "../../components/element/button";
import { IoArrowBackSharp } from "react-icons/io5";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Public_Pay } from "../../config";

const Special = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { numbersOnly, checkbill, memoname } = location.state;
  const [allValues, setAllValues] = useState({
    title: "miniin",
    by: "marcage",
    born: "2022.12.16",
    forwhat: "nonprofit",
  });
  const ImageCheck = () => {
    switch (+memoname) {
      case 1:
        return onegc;
      case 5:
        return fivegc;
      case 10:
        return tengc;
      case 20:
        return twengc;
      case 50:
        return fivtygc;
      case 100:
        return hundredgc;
      case 1000:
        return thougc;
      case 100000:
        return hundredthougc;
      case 1000000:
        return miliongc;
      default:
        break;
    }
  };
  const changeHandler = (e) => {
    setAllValues({ ...allValues, [e.target.name]: e.target.value });
  };

  const ImageContainer = styled(Row)`
    background-image: url(${ImageCheck});
    background-position: center;
    background-repeat: no-repeat;
    background-size: contain;
    width: 700px;
    height: 330px;
  `;

  return (
    <Wrapper>
      <Back onClick={() => navigate(Public_Pay)}>
        <IoArrowBackSharp />
        back
      </Back>
      <TokenEditor>
        <ImageContainer>
          <ImageWrapper>
            <Row>{checkbill}</Row>
            <ImageGroup>
              <DefaultImage src={coinimage} />
              <DetailWrapper>
                <TokenEditor>
                  <Text>Title</Text>
                  <Text>{allValues.title}</Text>
                </TokenEditor>
                <TokenEditor>
                  <Text>By</Text>
                  <Text>{allValues.by}</Text>
                </TokenEditor>
                <TokenEditor>
                  <Text>Born</Text>
                  <Text>{allValues.born}</Text>
                </TokenEditor>
                <TokenEditor>
                  <Text>For</Text>
                  <Text>{allValues.forwhat}</Text>
                </TokenEditor>
              </DetailWrapper>
            </ImageGroup>
            <>{numbersOnly}</>
          </ImageWrapper>
        </ImageContainer>
        <InputWrapper>
          <TokenEditor>
            <InputContainer>
              <Title>Title</Title>
              <Input onChange={changeHandler} name="title" />
            </InputContainer>
            <InputContainer>
              <Title>Title</Title>
              <Input onChange={changeHandler} name="by" />
            </InputContainer>
          </TokenEditor>
          <TokenEditor>
            <InputContainer>
              <Title>Title</Title>
              <Input onChange={changeHandler} name="born" />
            </InputContainer>
            <InputContainer>
              <Title>Title</Title>
              <Input onChange={changeHandler} name="forwhat" />
            </InputContainer>
          </TokenEditor>
          <InputContainer>
            <Title>For</Title>
            <Input defaultValue="Charity #1" />
          </InputContainer>
          <ButtonWrapper>
            <Button>Add to Vault</Button>
            <Button>Add to Auctions</Button>
            <Button>Proceed</Button>
          </ButtonWrapper>
        </InputWrapper>
      </TokenEditor>
    </Wrapper>
  );
};

const Wrapper = styled(Column)`
  gap: 30px;
  align-items: flex-start;
`;

const ImageWrapper = styled(Column)`
  font-size: 12px;
  color: #ffffff;
  height: 100%;
  margin: auto;
  justify-content: space-around;
  gap: 25px;
`;
const DetailWrapper = styled(Column)`
  gap: 5px;
  align-items: flex-start;
  max-width: 100px;
  width: 100%;
`;
const InputWrapper = styled(Column)`
  gap: 20px;
  align-items: flex-start;
`;
const InputContainer = styled(Column)`
  gap: 15px;
  align-items: flex-start;
`;
const ButtonWrapper = styled(Row)`
  gap: 20px;
  align-items: flex-start;
  flex-wrap: wrap;
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
const Text = styled(Row)`
  font-size: 14px;
`;
const Back = styled(Row)`
  font-size: 20px;
  gap: 10px;
`;
const TokenEditor = styled(Row)`
  gap: 10px;
`;
const ImageGroup = styled(Row)`
  gap: 80px;
  img {
    width: 100px;
    padding-left: 180px;
  }
`;
export default Special;
