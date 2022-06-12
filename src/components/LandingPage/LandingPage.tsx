import { FunctionComponent } from "react";

import Nav from "./Nav";
import Hero from "./Hero";
import BreakAreaOne from "./BreakAreaOne";

import styles from "./LandingPage.module.css"
import HowToArea from "./HowToArea";
import CTAAreaOne from "./CTAAreaOne";
import InActionArea from "./InActionArea";
import CTAAreaLast from "./CTAAreaLast";

const LandingPage: FunctionComponent = () => {

    return (
    <div>
        <div className={styles.container}>
            <Nav />
            <Hero />
            <BreakAreaOne />
            <CTAAreaOne />
            <HowToArea />
            <InActionArea />
            <CTAAreaLast />
        </div>

    </div>
    )
}

export default LandingPage