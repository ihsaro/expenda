import { useEffect } from "react";

import { Layout } from 'antd';

import { performGet } from "utils/api_communication";
import { LogonNavigationBar } from "components/navigation_bar/navigation_bar";
import { LogonHeader } from "components/header/header";

const { Footer, Content } = Layout;

export function Home() {
    return (
        <Layout>
            <LogonNavigationBar selectedKey="home" />
            <Layout>
                <LogonHeader title="Home" />
                <Content>Content</Content>
                <Footer>Footer</Footer>
            </Layout>
        </Layout>
    )
}