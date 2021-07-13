import { useEffect, useState } from "react";

import { AuthenticatedWelcome } from "components/authenticated_welcome/authenticated_welcome";
import { Welcome } from "components/welcome/welcome";
import { Loader } from "components/loader/loader";

import { checkifUserIsAuthenticated } from "utils/authentication_store";

export default function Index() {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    checkifUserIsAuthenticated().then((response) => {
      if (response == true) setIsAuthenticated(true);
      setIsLoading(false);
    });
  });

  if (isLoading) return <Loader />;
  else if (isAuthenticated) return <AuthenticatedWelcome />;
  else return <Welcome />;
}
