import { useEffect } from "react";

import { Layout } from 'antd';

import { performGet } from "utils/api_communication";
import { LogonNavigationBar } from "components/navigation_bar/navigation_bar";

const { Header, Footer, Sider, Content } = Layout;

export function Home() {
    return (
        <LogonNavigationBar selectedKey="home" />
    )
}