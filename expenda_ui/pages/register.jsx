import { useEffect } from "react";
import { Form, Input, Button, Checkbox, notification } from "antd";

import { performPost } from "utils/api_communication";
import { GuestNavigationBar } from "components/navigation_bar/navigation_bar";
import { Footer } from "components/footer/footer";

export default function Register() {

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

	const openNotificationWithIcon = (type, title, description) => {
		notification[type]({
		  	message: title,
		  	description: description,
		  	style: { fontFamily: "'Montserrat', sans-serif" },
			placement: "bottomRight"
		});
	};

	const onFinish = values => {
		performPost("/api/v1/authentication/register/", {
			"first_name": values.first_name,
            "last_name": values.last_name,
            "email": values.email,
            "username": values.username,
			"password": values.password
		}).then(response => {
			if (response.status == 201) {
				openNotificationWithIcon("success", "Register Successful", "User created");
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
				<h1 style={headerStyles}>Register</h1>
			</header>
			<main>
				<Form
                    labelCol={{span: 24}}
					name="register"
					initialValues={{
						remember: true,
					}}
					onFinish={onFinish}
					onFinishFailed={onFinishFailed}
					style={formStyles}
				>
                    <Form.Item style={{ marginBottom: 0 }}>
                        <Form.Item
                            label="First Name"
                            name="first_name"
                            rules={[
                            {
                                required: true,
                                message: 'Please input your first name!',
                            },
                            ]}
                            style={{display: "inline-block", width: "calc(50% - 8px)"}}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Last Name"
                            name="last_name"
                            rules={[
                            {
                                required: true,
                                message: 'Please input your last name!',
                            },
                            ]}
                            style={{display: "inline-block", width: "calc(50% - 8px)", margin: "0 8px"}}
                        >
                            <Input />
                        </Form.Item>
                    </Form.Item>

                    <Form.Item
						label="Email Address"
						name="email"
						rules={[
						{
							required: true,
							message: 'Please input your email address!',
						},
						]}
                        style={{width: "calc(100% - 8px)"}}
					>
						<Input />
					</Form.Item>

                    <Form.Item
						label="Username"
						name="username"
						rules={[
						{
							required: true,
							message: 'Please input your username!',
						},
						]}
                        style={{width: "calc(100% - 8px)"}}
					>
						<Input />
					</Form.Item>

                    <Form.Item style={{ marginBottom: 0 }}>
                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                            ]}
                            style={{display: "inline-block", width: "calc(50% - 8px)"}}
                        >
                            <Input.Password />
                        </Form.Item>
                        
                        <Form.Item
                            label="Confirm Password"
                            name="confirm_password"
                            rules={[
                            {
                                required: true,
                                message: 'Please confirm your password!',
                            },
                            ]}
                            style={{display: "inline-block", width: "calc(50% - 8px)", margin: "0 8px"}}
                        >
                            <Input.Password />
                        </Form.Item>
                    </Form.Item>

					<Form.Item>
						<Button type="primary" htmlType="submit">Register</Button>
					</Form.Item>

				</Form>
			</main>
			<Footer />
		</>
	)
}