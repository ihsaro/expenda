import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { Layout, Menu, Modal } from "antd";
import { HomeOutlined, LoginOutlined, UserAddOutlined, PlusOutlined, UnorderedListOutlined, FundViewOutlined, LogoutOutlined, EditOutlined } from '@ant-design/icons';

import { performGet, performPost } from "utils/api_communication";

const { Sider } = Layout;

export function LogonNavigationBar(props) {
    const logonNavigationBarStyles = {
        width: "256px",
        fontFamily: "'Montserrat', sans-serif"
    }

    const [username, setUsername] = useState("");
    const [isLogoutModalVisible, setIsLogoutModalVisible] = useState(false);

    const router = useRouter();

    useEffect(() => {
        performGet("/api/v1/authentication/user-details/").then(response => {
			if (response.status == 200) {
                setUsername(response.data["username"]);
			}
		});
    })

    const showLogoutModal = () => {
        setIsLogoutModalVisible(true);
    };
    
    const handleOk = () => {
        setIsLogoutModalVisible(false);
        performPost("/api/v1/authentication/logout/").then(response => {
            if (response.status == 200) {
                router.push("/login");
            }
        });
    };
    
    const handleCancel = () => {
        setIsLogoutModalVisible(false);
    };

    const setSelectedKey = (event) => {
        props.onSelectedKeyChange(event.key);
    }

    return (
        <Sider style={logonNavigationBarStyles} collapsible theme="light">
            <div style={{ textAlign: "center", margin: "10px 0px 10px 0px" }}>Welcome {username}</div>
            <Menu
                defaultSelectedKeys={[props.selectedKey]}
                mode="inline"
            >
                <Menu.Item key="home" icon={<HomeOutlined />} onClick={(event) => setSelectedKey(event)}>Home</Menu.Item>
                <Menu.Item key="createExpense" icon={<PlusOutlined />} onClick={(event) => setSelectedKey(event)}>Create Expense</Menu.Item>
                <Menu.Item key="listExpenses" icon={<UnorderedListOutlined />} onClick={(event) => setSelectedKey(event)}>List Expenses</Menu.Item>
                <Menu.Item key="setBudget" icon={<EditOutlined />} onClick={(event) => setSelectedKey(event)}>Set Budget</Menu.Item>
                <Menu.Item key="viewBudgets" icon={<FundViewOutlined />} onClick={(event) => setSelectedKey(event)}>View Budgets</Menu.Item>
                <Menu.Item key="logout" icon={<LogoutOutlined />} style={{ color: "red" }} onClick={() => showLogoutModal()}>Logout</Menu.Item>
            </Menu>
            <Modal title="Logout" visible={isLogoutModalVisible} onOk={handleOk} onCancel={handleCancel}>
                Do you want to logout?
            </Modal>
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