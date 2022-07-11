import { FunctionComponent } from "react";

import styles from 'Footer.module.css'
const Footer: FunctionComponent = () => {

    return (
        <div className="container">
            <footer className={styles.footer}>
                {/* //? Put text content like that in some consts somewhere ? */}
                <p>Habit Streak Manager </p>
                <div>
                    <p></p>
                </div>
            </footer>
        </div>
    )
}

export default Footer