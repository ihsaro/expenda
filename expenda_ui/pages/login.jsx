import { Form, Input, Button, Checkbox } from "antd";

export default function Login() {

	const headerStyles = {
		paddingTop: "5%",
		fontFamily: "'Montserrat', sans-serif",
        fontSize: "3vw",
		textAlign: "center"
	}

	const formStyles = {
		fontFamily: "'Montserrat', sans-serif",
		width: "50%",
		margin: "2% auto"
	}

	const onFinish = values => {
		console.log("Success: ", values);
	}

	const onFinishFailed = errorInfo => {
		console.log("Failed: ", errorInfo);
	}

	return (
		<>
			<header style={headerStyles}>
				Login
			</header>
			<main>
				<Form
					name="login"
					initialValues={{
						remember: true,
					}}
					onFinish={onFinish}
					onFinishFailed={onFinishFailed}
					style={formStyles}
				>
					<Form.Item
						label="Username"
						name="username"
						rules={[
						{
							required: true,
							message: 'Please input your username!',
						},
						]}
					>
						<Input />
					</Form.Item>

					<Form.Item
						label="Password"
						name="password"
						rules={[
						{
							required: true,
							message: 'Please input your password!',
						},
						]}
					>
						<Input.Password />
					</Form.Item>

					<Form.Item name="remember" valuePropName="checked">
						<Checkbox>Remember me</Checkbox>
					</Form.Item>

					<Form.Item>
						<Button type="primary" htmlType="submit">Submit</Button>
						<Button type="danger" style={{float: "right"}}>Forgot Password?</Button>
					</Form.Item>

				</Form>
			</main>
			<footer>

			</footer>
		</>
	)
}