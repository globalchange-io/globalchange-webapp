import styled from "styled-components";
import { Row } from "../../components/element";

const Wrapper = styled(Row)`
  width: 100%;
  height: 100%;
  justify-content: center;
  font-size: 100px;
  font-family: "Jumbled";
`;
const Error = () => {
  return <Wrapper>404</Wrapper>;
};
export default Error;
