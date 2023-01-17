import { Table } from "@nextui-org/react";

const Analog = (props) => {
  const { totalGC, currentCPI, totalUSD, totalXLM, sendEachActual, xlmusd } =
    props;
  return (
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
          <Table.Cell>300</Table.Cell>
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
        <Table.Row key="7">
          <Table.Cell>Total cost to you in USD</Table.Cell>
          <Table.Cell>{totalUSD}</Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  );
};
export default Analog;
