import { FunctionComponent } from "react";

import Nav from "./Nav";
import Hero from "./Hero";
import BreakAreaOne from "./BreakAreaOne";

import styles from "./LandingPage.module.css"

const LandingPage: FunctionComponent = () => {

    return (
    <div>
        <div className={styles.container}>
            <Nav />
            <Hero />
            <BreakAreaOne />
        </div>

    </div>
    )
}

export default LandingPage