import { FunctionComponent } from "react"
import AreaOneCard from "./AreaOneCard"

import ThumbIcon from './thumbIcon.svg'

import styles from './LandingPage.module.css'

const BreakAreaOne: FunctionComponent = () => {

    return(
        <div className={styles.areaOneDiv}>
            <AreaOneCard icon={<ThumbIcon className={styles.icon} />} title='Easy to use' text="Manage your habits everyday with a few clicks, enjoy the multiples features and fonctionalities" />
            <AreaOneCard icon={<ThumbIcon className={styles.icon} />} title='Very effective' text="Designed following reasearch backed up informations about habit building and habit maintening" />
            <AreaOneCard icon={<ThumbIcon className={styles.icon} />} title='Entirely free' text="The whole app is entirely for free. You have access to all the features for free forever" />
        </div>
    )
}

export default BreakAreaOne