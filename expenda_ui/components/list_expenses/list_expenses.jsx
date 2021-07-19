import { useEffect, useState } from "react";
import { Table, Layout, Button, notification } from "antd";

import { performGet, performPost } from "utils/api_communication";

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
    {
      title: "Date Purchased",
      dataIndex: "purchased_timestamp",
      key: "purchased_timestamp",
    },
  ];

  const [expenses, setExpenses] = useState([]);
  const [selectedExpenses, setSelectedExpenses] = useState([]);
  const [toggleRefresh, setToggleRefresh] = useState(false);
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
            purchased_timestamp: new Date(
              expense.purchased_timestamp
            ).toDateString(),
          });
        });
        setExpenses(expensesResponse);
      }
    });
  }, [toggleRefresh]);

  const contentStyles = {
    margin: "10px",
  };

  const tableStyles = {
    fontFamily: "'Montserrat', sans-serif",
  };

  const openNotificationWithIcon = (type, title, description) => {
    notification[type]({
      message: title,
      description: description,
      style: { fontFamily: "'Montserrat', sans-serif" },
      placement: "bottomRight",
    });
  };

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      setSelectedExpenses(selectedRowKeys);
    },
  };

  const performBatchExpensesDelete = (e) => {
    performPost("/api/v1/expenses/batch-delete/", {
      list_pk: selectedExpenses,
    }).then((response) => {
      if (response.status == 200) {
        openNotificationWithIcon("success", "Success", "Expenses deleted");
        setToggleRefresh(!toggleRefresh);
      }
    });
  };

  return (
    <Content style={contentStyles}>
      <Button type="danger" onClick={(e) => performBatchExpensesDelete(e)}>
        Delete
      </Button>
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
