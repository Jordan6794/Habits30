import { FunctionComponent } from "react";
import Content from "./Content";

import styles from './TermsOfService.module.css' 

const TermsOfService: FunctionComponent = () => {
    return (
        <div className={styles.tosDiv}>
            <Content />
        </div>
    )
}

export default TermsOfService