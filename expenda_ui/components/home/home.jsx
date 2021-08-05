import { useEffect, useState } from "react";
import { Col, Row } from "antd";

import { performGet } from "utils/api_communication";

export function Home() {
  const [data, setData] = useState([]);

  useEffect(() => {
    performGet("/api/v1/expenses/list-monthly-expenses-total/").then(
      (response) => {
        if (response.status == 200) {
          const monthlyExpensesResponse = [];
          response.data.forEach((monthlyExpense) => {
            monthlyExpensesResponse.push({
              month: monthlyExpense.month,
              value: monthlyExpense.value,
            });
          });
          setData(monthlyExpensesResponse);
        }
      }
    );
  }, []);

  return (
    <>
      <Row>
        <Col span={22} offset={1}>
          <div>Dummy</div>
        </Col>
      </Row>
      <Row justify="center" style={{ marginTop: "10px" }}>
        <Col>
          <p style={{ fontFamily: "'Montserrat'" }}>
            Total money spent on expenses
          </p>
        </Col>
      </Row>
    </>
  );
}
