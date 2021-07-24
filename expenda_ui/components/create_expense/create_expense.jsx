import {
  Form,
  Input,
  InputNumber,
  Button,
  DatePicker,
  Layout,
  Row,
  Col,
  notification,
} from "antd";
import moment from "moment";
import { performPost } from "utils/api_communication";
import { getToday } from "utils/date_utils";

const { Content } = Layout;

export function CreateExpense() {
  const onFinish = (values) => {
    performPost("/api/v1/expenses/", {
      name: values.name,
      description: values.description,
      price: values.price,
      quantity: values.quantity,
      purchased_timestamp: values.purchased_timestamp,
    }).then((response) => {
      if (response.status == 400) {
        // openNotificationWithIcon("error", "Bad data", "Credentials provided incorrect");
      } else if (response.status == 201) {
        openNotificationWithIcon("success", "Created", "Product Added");
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
        name="createExpense"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        style={formStyles}
      >
        <Row>
          <Col span={22} offset={1}>
            <Form.Item
              label="Name"
              name="name"
              rules={[
                {
                  required: true,
                  message: "Please input expense name!",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={22} offset={1}>
            <Form.Item label="Description" name="description">
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={6} offset={1}>
            <Form.Item label="Price" name="price">
              <InputNumber />
            </Form.Item>
          </Col>

          <Col span={6} offset={1}>
            <Form.Item label="Quantity" name="quantity">
              <InputNumber />
            </Form.Item>
          </Col>

          <Col span={6} offset={1}>
            <Form.Item label="Date Purchased" name="purchased_timestamp">
              <DatePicker defaultValue={moment(getToday(), "YYYY-MM-DD")} />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={10} offset={1}>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Create Expense
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Content>
  );
}
