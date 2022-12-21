import styled from "styled-components";
import { Column, DefaultImage, Row } from "../element";
import user1 from "../../assets/image/user1.png";
const Myfeed = () => {
  return (
    <Wrapper>
      <DefaultImage src={user1} />
      <WrapperContent>
        <Title>Someone has sent you 100 GC recently</Title>
        <Text>Dec 5, 2021 at 11:09pm</Text>
      </WrapperContent>
    </Wrapper>
  );
};

const Wrapper = styled(Row)`
  gap: 20px;
  width: 100%;
  border-bottom: 1px solid rgba(0, 0, 0, 0.3);
  padding: 20px 0px;
`;
const WrapperContent = styled(Column)`
  gap: 5px;
  align-items: flex-start;
`;
const Title = styled.div`
  font-size: 16px;
  font-weight: bold;
`;
const Text = styled.div`
  font-size: 12px;
`;
export default Myfeed;
