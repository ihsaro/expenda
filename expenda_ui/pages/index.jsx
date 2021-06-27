import { useEffect, useState } from "react";

import { Home } from "components/home/home";
import { Welcome } from "components/welcome/welcome";
import { Loader } from "components/loader/loader";

import { checkifUserIsAuthenticated } from "utils/authentication_store";

export default function Index() {

    const [isLoading, setIsLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        checkifUserIsAuthenticated().then(response => {
            if (response == true)
                setIsAuthenticated(true);
            setIsLoading(false);
        })
    })

    if (isLoading)
        return <Loader />
    else
        if (isAuthenticated)
            return <Home />
        else
            return <Welcome />
}