import { useEffect, useState } from "react";
import { Table, Layout } from "antd";

import { performGet } from "utils/api_communication";

const { Content } = Layout;

export function ListExpenses() {
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
  ];

  const [expenses, setExpenses] = useState([]);
  const selectionType = "checkbox";

  useEffect(() => {
    performGet("/api/v1/expenses/").then((response) => {
      if (response.status == 200) {
        const expensesResponse = [];
        response.data.forEach((expense) => {
          expensesResponse.push({
            key: expense.id,
            name: expense.name,
            description: expense.description,
            price: expense.price,
            quantity: expense.quantity,
          });
        });
        setExpenses(expensesResponse);
      }
    });
  }, []);

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows
      );
    }
  };

  const contentStyles = {
    margin: "10px",
  };

  const tableStyles = {
    fontFamily: "'Montserrat', sans-serif",
  };

  return (
    <Content style={contentStyles}>
      <Table
        columns={columns}
        dataSource={expenses}
        style={tableStyles}
        rowSelection={{
          type: selectionType,
          ...rowSelection,
        }}
      />
    </Content>
  );
}
