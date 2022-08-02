import { FunctionComponent } from "react";
import { Link } from "react-router-dom";

import styles from "./LandingPage.module.css"

const Nav: FunctionComponent = () => {

    return(
    <div className={styles.Nav}>
        <Link to='/'><h3 className={styles.title}>Habits30</h3></Link>
        <div className="">
        <Link to='/login'><button className={`${styles.btn} ${styles.btnInvisible}`}>Log In</button></Link>
        <Link to='/signup'><button className={`${styles.btn} ${styles.btnPrimary}`}>Sign Up</button></Link>
        </div>
    </div>
    )
}
export default Nav