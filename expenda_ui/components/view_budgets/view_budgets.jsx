import { useEffect, useState } from "react";
import { Table, Layout } from "antd";

import { performGet } from "utils/api_communication";

const { Content } = Layout;

export function ViewBudgets() {
  const columns = [
    {
      title: "Timeframe",
      dataIndex: "timeframe",
      key: "timeframe",
    },
    {
      title: "Budget",
      dataIndex: "budget",
      key: "budget",
    },
  ];

  const [budgets, setBudgets] = useState([]);

  useEffect(() => {
    checkifUserIsAuthenticated().then((response) => {
      if (response == false) {
        router.push("/login");
      }
      else {
        performGet("/api/v1/monthly-budgets/").then((response) => {
          if (response.status == 200) {
            const budgetResponse = [];
            response.data.forEach((budget) => {
              budgetResponse.push({
                key: budget.id,
                timeframe: `${budget.month} ${budget.year}`,
                budget: budget.budget,
              });
            });
            setBudgets(budgetResponse);
          }
        });
      }
    });
  }, []);

  const contentStyles = {
    margin: "10px",
  };

  const tableStyles = {
    fontFamily: "'Montserrat', sans-serif",
  };

  return (
    <Content style={contentStyles}>
      <Table columns={columns} dataSource={budgets} style={tableStyles} />
    </Content>
  );
}
