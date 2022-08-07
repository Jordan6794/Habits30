import { FunctionComponent } from "react";
import Content from "./Content";

import styles from './PrivacyPolicy.module.css' 

const PrivacyPolicy: FunctionComponent = () => {
    return (
        <div className={styles.privacyDiv}>
            <Content />
        </div>
    )
}

export default PrivacyPolicy