import { useRouter } from "next/router";
import { Button, Layout, Space } from 'antd';
import { LoginOutlined, UserAddOutlined } from '@ant-design/icons';

import { GuestNavigationBar } from "components/navigation_bar/navigation_bar";
import { Footer } from "components/footer/footer";

export function Welcome() {

    const headerStyles = {
        paddingTop: "12%",
        fontFamily: "'Montserrat', sans-serif",
        fontSize: "75px",
        textAlign: "center"
    };

    const mainStyles = {
        marginTop: "3%",
        fontFamily: "'Montserrat', sans-serif",
        textAlign: "center"
    }

    const buttonStyles = {
        margin: "0px 5px 0px 5px"
    }

    const router = useRouter();

    return (
        <>
            <header>
                <GuestNavigationBar />
                <h1 style={headerStyles}>Welcome to Expenda</h1>
            </header>
            <main style={mainStyles}>
                <Button type="primary" shape="round" icon={<LoginOutlined />} size="large" onClick={() => router.push("/login")} style={buttonStyles}>Login</Button>
                <Button type="primary" shape="round" icon={<UserAddOutlined />} size="large" onClick={() => router.push("/register")} style={buttonStyles}>Register</Button>
            </main>
            <Footer />
        </>
    )
}