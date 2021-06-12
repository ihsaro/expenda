import { useRouter } from "next/router";

import { Menu } from "antd";
import { LoginOutlined, HomeOutlined, UserAddOutlined } from '@ant-design/icons';

export function LogonNavigationBar() {
    return <nav>Hey</nav>
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