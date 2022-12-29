import styled from "styled-components";

const Button = ({ children, onClick }) => {
  return <Wrapper onClick={onClick}>{children}</Wrapper>;
};
const Wrapper = styled.button`
  background: #1b5e76;
  border-radius: 5px;
  font-size: 14px;
  color: white;
  padding: 10px;
  width: 180px;
  &:active {
    background-color: #528193;
  }
`;
export default Button;
