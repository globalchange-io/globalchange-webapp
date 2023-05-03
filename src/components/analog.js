import { Table } from "@nextui-org/react";
import { Column, Row } from "./element";
import styled from "styled-components";
import { useState } from "react";

const Analog = (props) => {
  const { totalGC, currentCPI, totalUSD, totalXLM, sendEachActual, xlmusd } =
    props;

  const [optionalFlag, setOptionalFlag] = useState(false);
  return (
    <Wrapper>
      <Row>
        <CheckBox
          type="checkbox"
          onChange={() => {
            setOptionalFlag(!optionalFlag);
          }}
        />
        +1% to wallet software developer
      </Row>
      <Table
        aria-label="Example table with static content"
        css={{
          height: "auto",
          minWidth: "100%",
          width: "100%",
          fontSize: "20px",
        }}
      >
        <Table.Header>
          <Table.Column>NAME</Table.Column>
          <Table.Column>Value</Table.Column>
        </Table.Header>
        <Table.Body>
          <Table.Row key="1">
            <Table.Cell>Total GC</Table.Cell>
            <Table.Cell>{totalGC}</Table.Cell>
          </Table.Row>
          <Table.Row key="2">
            <Table.Cell>Current CPI</Table.Cell>
            <Table.Cell>{currentCPI}</Table.Cell>
          </Table.Row>
          <Table.Row key="3">
            <Table.Cell>#CPI baskets</Table.Cell>
            <Table.Cell>{(+totalUSD / currentCPI).toFixed(2)}</Table.Cell>
          </Table.Row>
          <Table.Row key="4">
            <Table.Cell>Current XLM</Table.Cell>
            <Table.Cell>{xlmusd}</Table.Cell>
          </Table.Row>
          <Table.Row key="5">
            <Table.Cell>Total XLM to send</Table.Cell>
            <Table.Cell>{totalXLM}</Table.Cell>
          </Table.Row>
          <Table.Row key="6">
            <Table.Cell>XLM to each nonprofit</Table.Cell>
            <Table.Cell>{sendEachActual}</Table.Cell>
          </Table.Row>
          {optionalFlag && (
            <Table.Row key="7">
              <Table.Cell>+1% to wallet software developer</Table.Cell>
              <Table.Cell>{totalUSD / 100}</Table.Cell>
            </Table.Row>
          )}
          <Table.Row key="8">
            <Table.Cell>Total cost to you in USD</Table.Cell>
            <Table.Cell>{totalUSD}</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </Wrapper>
  );
};
const Wrapper = styled(Column)`
  align-items: flex-start;
  gap: 10px;
  width: 100%;
  font-size: 20px;
`;
const CheckBox = styled.input`
  margin-right: 10px;
`;
export default Analog;
