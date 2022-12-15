import styled from "styled-components";

const Button = ({ children, props }) => {
  return <Wrapper>{children}</Wrapper>;
};
const Wrapper = styled.button`
  background: #1b5e76;
  border-radius: 5px;
  font-size: 14px;
  color: white;
  padding: 10px;
  width: 180px;
`;
export default Button;
