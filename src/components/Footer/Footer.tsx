import { FunctionComponent } from "react";

import styles from './Footer.module.css'
const Footer: FunctionComponent = () => {

    return (
        <div className="container">
            <footer className={styles.footer}>
                {/* //? Put text content like that in some consts somewhere ? */}
                <p className={styles.footerLeft}>Habits30, 2022</p>
                <div className={`flex ${styles.footerRight}`}>
                    <p className={styles.footerItem}>Privacy</p>
                    <p className={styles.footerItem}>Terms of service</p>
                    <p className={styles.footerItem}>Contact us</p>
                </div>
            </footer>
        </div>
    )
}

export default Footer