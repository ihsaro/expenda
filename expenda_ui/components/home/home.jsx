import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { Layout } from 'antd';

import { LogonNavigationBar } from "components/navigation_bar/navigation_bar";
import { LogonHeader } from "components/header/header";
import { Loader } from "components/loader/loader";

import { performGet } from "utils/api_communication";
import { checkifUserIsAuthenticated } from "utils/authentication_store";

const { Footer, Content } = Layout;

export function Home() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);
    
    useEffect(() => {
        checkifUserIsAuthenticated().then(response => {
            if (response == false) {
                router.push("/login");
            }
            else {
                setIsLoading(false);
            }
        });
    }, []);

    if (isLoading) {
        return <Loader />
    }
    else {
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
}