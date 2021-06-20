import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { Layout, Menu } from "antd";
import { HomeOutlined, LoginOutlined, UserAddOutlined, PlusOutlined, UnorderedListOutlined, FundViewOutlined, LogoutOutlined, EditOutlined } from '@ant-design/icons';

import { performGet } from "utils/api_communication";

const { Sider } = Layout;

export function LogonNavigationBar(props) {
    const logonNavigationBarStyles = {
        width: "256px",
        fontFamily: "'Montserrat', sans-serif"
    }

    const [username, setUsername] = useState("");

    useEffect(() => {
        performGet("/api/v1/authentication/user-details/").then(response => {
			if (response.status == 200) {
                setUsername(response.data["username"]);
			}
		});
    })

    return (
        <Sider style={logonNavigationBarStyles} collapsible theme="light">
            <div style={{ textAlign: "center", margin: "10px 0px 10px 0px" }}>Welcome {username}</div>
            <Menu
                defaultSelectedKeys={[props.selectedKey]}
                mode="inline"
            >
                <Menu.Item key="home" icon={<HomeOutlined />}>Home</Menu.Item>
                <Menu.Item key="createExpense" icon={<PlusOutlined />}>Create Expense</Menu.Item>
                <Menu.Item key="listExpenses" icon={<UnorderedListOutlined />}>List Expenses</Menu.Item>
                <Menu.Item key="setBudget" icon={<EditOutlined />}>Set Budget</Menu.Item>
                <Menu.Item key="viewBudget" icon={<FundViewOutlined />}>View Budgets</Menu.Item>
                <Menu.Item key="logout" icon={<LogoutOutlined />} style={{ color: "red" }}>Logout</Menu.Item>
            </Menu>
        </Sider>
    )
}

export function GuestNavigationBar() {

    const guestNavigationBarStyles = {
        fontFamily: "'Montserrat', sans-serif"
    }

    const router = useRouter();

    return (
        <Menu
            mode="horizontal"
            style={guestNavigationBarStyles}
        >
            <Menu.Item key="guestNavigationBarHome" icon={<HomeOutlined />} onClick={() => router.push("/")} style={{textDecoration: "none"}}>Home</Menu.Item>
            <Menu.Item key="guestNavigationBarLogin" icon={<LoginOutlined />} style={{float: "right"}} onClick={() => router.push("/login")}>Login</Menu.Item>
            <Menu.Item key="guestNavigationBarRegister" icon={<UserAddOutlined />} style={{float: "right"}} onClick={() => router.push("/register")}>Register</Menu.Item>
        </Menu>
    )
}