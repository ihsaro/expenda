import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { Layout } from 'antd';

import { LogonNavigationBar } from "components/navigation_bar/navigation_bar";
import { LogonHeader } from "components/header/header";
import { Loader } from "components/loader/loader";

import { Home } from "components/home/home";
import { CreateExpense } from "components/create_expense/create_expense";
import { ListExpenses } from "components/list_expenses/list_expenses";
import { SetBudget } from "components/set_budget/set_budget";
import { ViewBudgets } from "components/view_budgets/view_budgets";

import { performGet } from "utils/api_communication";
import { checkifUserIsAuthenticated } from "utils/authentication_store";

const { Footer, Content } = Layout;

export function AuthenticatedWelcome() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);
    const [selectedKey, setSelectedKey] = useState("home");
    const [title, setTitle] = useState("Home");
    const [component, setComponent] = useState(<Home />);

    const keyTitleComponentMapper = [
        { "key": "home", "title": "Home", "component": <Home /> },
        { "key": "createExpense", "title": "Create Expense", "component": <CreateExpense /> },
        { "key": "listExpenses", "title": "List Expenses", "component": <ListExpenses /> },
        { "key": "setBudget", "title": "Set Budget", "component": <SetBudget /> },
        { "key": "viewBudgets", "title": "View Budgets", "component": <ViewBudgets /> },
    ]

    const changeSelectedKeyAndTitle = (value) => {
        setSelectedKey(value);
        
        keyTitleComponentMapper.forEach(keyTitleComponent => {
            if (keyTitleComponent.key == value) {
                setTitle(keyTitleComponent.title)
                setComponent(keyTitleComponent.component)
            }
        })
    }
    
    useEffect(() => {
        checkifUserIsAuthenticated().then(response => {
            if (response == false) {
                router.push("/login");
            }
            else {
                setIsLoading(false);
            }
        });
    });

    if (isLoading) {
        return <Loader />
    }
    else {
        return (
            <Layout>
                <LogonNavigationBar selectedKey={selectedKey} onSelectedKeyChange={changeSelectedKeyAndTitle} />
                <Layout style={{backgroundColor: "white"}}>
                    <LogonHeader title={title} />
                    {component}
                </Layout>
            </Layout>
        )
    }
}