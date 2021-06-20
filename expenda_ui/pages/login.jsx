import { useRouter } from "next/router";

import { Form, Input, Button, Checkbox, notification } from "antd";

import { performPost } from "utils/api_communication";
import { GuestNavigationBar } from "components/navigation_bar/navigation_bar";
import { Footer } from "components/footer/footer";

export default function Login() {

	const headerStyles = {
		paddingTop: "20px",
		fontFamily: "'Montserrat', sans-serif",
        fontSize: "35px",
		textAlign: "center",
		width: "50%",
		margin: "0 auto"
	}

	const formStyles = {
		fontFamily: "'Montserrat', sans-serif",
		width: "50%",
		margin: "2% auto"
	}

    const router = useRouter();

	const openNotificationWithIcon = (type, title, description) => {
		notification[type]({
		  	message: title,
		  	description: description,
		  	style: { fontFamily: "'Montserrat', sans-serif" },
			placement: "bottomRight"
		});
	};

	const onFinish = values => {
		performPost("/api/v1/authentication/login/", {
			"username": values.username,
			"password": values.password
		}).then(response => {
			if (response.status == 401) {
				openNotificationWithIcon("error", "Login Error", "Credentials provided incorrect");
			}
			else if (response.status == 200) {
				// openNotificationWithIcon("success", "Login Successful", "Credentials provided correct");
				router.push("/");
			}
		});
	}

	const onFinishFailed = errorInfo => {
		console.log("Failed: ", errorInfo);
	}

	return (
		<>
			<header>
				<GuestNavigationBar />
				<h1 style={headerStyles}>Login</h1>
			</header>
			<main>
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
						<Button type="primary" htmlType="submit">Login</Button>
						<Button type="danger" style={{float: "right"}}>Forgot Password?</Button>
					</Form.Item>

				</Form>
			</main>
			<Footer />
		</>
	)
}