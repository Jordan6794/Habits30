import { FunctionComponent } from "react";
import { Link } from "react-router-dom";

import styles from "./LandingPage.module.css"

const Nav: FunctionComponent = () => {

    return(
    <div className={styles.Nav}>
        <Link to='/'><h3 className={styles.title}>Habit Streak Manager</h3></Link>
        <div className="">
            <button className={`btn ${styles.btn} ${styles.btnInvisible}`}>Log In</button>
            <button className={`btn ${styles.btn} ${styles.btnPrimary}`}>Sign Up</button>
        </div>
    </div>
    )
}
export default Nav