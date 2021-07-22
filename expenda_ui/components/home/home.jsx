import { useEffect, useState } from "react";
import { Line } from '@ant-design/charts';

import { performGet } from "utils/api_communication";

export function Home() {
  const [data, setData] = useState([]);

  useEffect(() => {
    performGet("/api/v1/expenses/list-monthly-expenses-total/").then((response) => {
      if (response.status == 200) {
        const monthlyExpensesResponse = [];
        response.data.forEach((monthlyExpense) => {
          monthlyExpensesResponse.push({
            month: monthlyExpense.month,
            value: monthlyExpense.value
          });
        });
        debugger;
        setData(monthlyExpensesResponse);
      }
    });
  }, []);

  const config = {
    data,
    height: 400,
    xField: 'month',
    yField: 'value',
    point: {
      size: 5,
      shape: 'diamond',
    },
    label: {
      style: {
        fill: '#aaa',
      },
    },
  };
  return <Line {...config} />;
}
