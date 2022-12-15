import styled from "styled-components";
import { Row } from ".";

const SelectBox = (props) => {
  return (
    <Wrapper>
      <>{props.label}</>
      <WrapperContent>
        <WrapperItem value="dog">Dog</WrapperItem>
        <WrapperItem value="dog">Dog</WrapperItem>
      </WrapperContent>
    </Wrapper>
  );
};
const Wrapper = styled(Row)`
  gap: 5px;
  max-width: 300px;
  width: 100%;
`;
const WrapperContent = styled.select`
  gap: 10px;
  width: 100%;
`;
const WrapperItem = styled.option``;
export default SelectBox;
