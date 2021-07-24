import {
  Form,
  Input,
  InputNumber,
  Button,
  Layout,
  Row,
  Col,
  Select,
  notification,
} from "antd";
import { performPost } from "utils/api_communication";

const { Content } = Layout;

export function SetBudget() {
  const onFinish = (values) => {
    performPost("/api/v1/expenses/monthly-budget/", {
      month: values.month,
      year: values.year,
      budget: values.budget,
    }).then((response) => {
      if (response.status == 400) {
        // openNotificationWithIcon("error", "Bad data", "Credentials provided incorrect");
      } else if (response.status == 201) {
        openNotificationWithIcon("success", "Created", "Budget Created");
      } else if (response.status == 200) {
        openNotificationWithIcon("success", "Updated", "Budget Updated");
      }
    });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed: ", errorInfo);
  };

  const openNotificationWithIcon = (type, title, description) => {
    notification[type]({
      message: title,
      description: description,
      style: { fontFamily: "'Montserrat', sans-serif" },
      placement: "bottomRight",
    });
  };

  const formStyles = {
    fontFamily: "'Montserrat', sans-serif",
  };

  return (
    <Content>
      <Form
        labelCol={{ span: 24 }}
        name="setContent"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        style={formStyles}
      >
        <Row>
          <Col span={6} offset={1}>
            <Form.Item
              label="Month"
              name="month"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Select defaultValue="JAN">
                <Select.Option value="JAN">January</Select.Option>
                <Select.Option value="FEB">February</Select.Option>
                <Select.Option value="MAR">March</Select.Option>
                <Select.Option value="APR">April</Select.Option>
                <Select.Option value="MAY">May</Select.Option>
                <Select.Option value="JUN">June</Select.Option>
                <Select.Option value="JUL">July</Select.Option>
                <Select.Option value="AUG">August</Select.Option>
                <Select.Option value="SEP">September</Select.Option>
                <Select.Option value="OCT">October</Select.Option>
                <Select.Option value="NOV">November</Select.Option>
                <Select.Option value="DEC">December</Select.Option>
              </Select>
            </Form.Item>
          </Col>
          
          <Col span={6} offset={1}>
            <Form.Item
              label="Year"
              name="year"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <InputNumber min={1970} max={2050} defaultValue={new Date().getFullYear()} style={{ width: "100%" }} />
            </Form.Item>
          </Col>

          <Col span={6} offset={1}>
            <Form.Item
              label="Budget"
              name="budget"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <InputNumber style={{ width: "100%" }} defaultValue={0} />
            </Form.Item>
          </Col>

        </Row>
        <Row>
          <Col span={10} offset={1}>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Set Budget
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Content>
  );
}
