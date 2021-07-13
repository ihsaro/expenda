import {
  Form,
  Input,
  InputNumber,
  Button,
  Layout,
  Row,
  Col,
  notification,
} from "antd";
import { performPost } from "utils/api_communication";

const { Content } = Layout;

export function CreateExpense() {
  const onFinish = (values) => {
    performPost("/api/v1/expenses/", {
      name: values.name,
      description: values.description,
      price: values.price,
      quantity: values.quantity,
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
        name="login"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        style={formStyles}
      >
        <Row>
          <Col span={10} offset={1}>
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

          <Col span={10} offset={1}>
            <Form.Item label="Description" name="description">
              <Input />
            </Form.Item>
          </Col>

          <Col span={10} offset={1}>
            <Form.Item label="Price" name="price">
              <InputNumber />
            </Form.Item>
          </Col>

          <Col span={10} offset={1}>
            <Form.Item label="Quantity" name="quantity">
              <InputNumber />
            </Form.Item>
          </Col>

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
