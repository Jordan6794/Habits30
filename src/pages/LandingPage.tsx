import { FunctionComponent } from "react";

import Nav from "../components/LandingPage/Nav";
import Hero from "../components/LandingPage/Hero";
import BreakAreaOne from "../components/LandingPage/BreakAreaOne";

import styles from "../components/LandingPage/LandingPage.module.css"

import HowToArea from "../components/LandingPage/HowToArea";
import CTAAreaOne from "../components/LandingPage/CTAAreaOne";
import InActionArea from "../components/LandingPage/InActionArea";
import CTAAreaLast from "../components/LandingPage/CTAAreaLast";
import Footer from "../components/Footer/Footer";

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
            <Footer />
        </div>

    </div>
    )
}

export default LandingPage