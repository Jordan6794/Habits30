import { FunctionComponent } from "react";
import { Link } from "react-router-dom";

import styles from './Footer.module.css'
const Footer: FunctionComponent = () => {

    return (
        <div className="container">
            <footer className={styles.footer}>
                {/* //? Put text content like that in some consts somewhere ? */}
                <p className={styles.footerLeft}>Habits30, 2022</p>
                <div className={`flex ${styles.footerRight}`}>
                    <Link to='/privacy'><p className={styles.footerItem}>Privacy</p></Link>
                    <Link to='/tos'><p className={styles.footerItem}>Terms of service</p></Link>         
                    <p className={styles.footerItem}>Contact us</p>
                </div>
            </footer>
        </div>
    )
}

export default Footer