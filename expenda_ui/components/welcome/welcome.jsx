import { useRouter } from "next/router";
import { Button, Layout, Space } from 'antd';
import { LoginOutlined, UserAddOutlined } from '@ant-design/icons';

const { Header, Content } = Layout;

export function Welcome() {

    const headerStyles = {
        paddingTop: "12%",
        fontFamily: "'Montserrat', sans-serif",
        fontSize: "5vw",
        textAlign: "center"
    };

    const mainStyles = {
        marginTop: "3%",
        fontFamily: "'Montserrat', sans-serif",
        textAlign: "center"
    }

    const footerStyles = {
        position: "fixed",
        bottom: 0,
        right: 0,
        margin: "0px 10px 10px 0px",
        fontFamily: "'Montserrat', sans-serif",
        fontSize: "1.1vw"
    }

    const router = useRouter();

    return (
        <>
            <header style={headerStyles}>Welcome to Expenda</header>
            <main style={mainStyles}>
                <Space>
                    <Button type="primary" shape="round" icon={<LoginOutlined />} size="large" onClick={() => router.push("/login")}>Login</Button>
                    <Button type="primary" shape="round" icon={<UserAddOutlined />} size="large" onClick={() => router.push("/register")}>Register</Button>
                </Space>
            </main>
            <footer style={footerStyles}>Built using Django Rest Framework and React JS with Ant Design</footer>
        </>
    )
}