import { useRouter } from "next/router";
import React, { useEffect } from "react";

import { withLayout } from "../layout/Layout";

const Home = (): JSX.Element => {
    const router = useRouter();

    useEffect(() => {
        router.push("/cources");
    }, []);

    return <></>;
};

export default withLayout(Home);
