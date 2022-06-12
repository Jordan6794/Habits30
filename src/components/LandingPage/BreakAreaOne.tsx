import { FunctionComponent } from "react"
import AreaOneCard from "./AreaOneCard"

import CheckCircle from './SVG/check_circle.svg'
import Heart from './SVG/heart.svg'
import Smiley from './SVG/smiley.svg'

import styles from './LandingPage.module.css'

const BreakAreaOne: FunctionComponent = () => {

    return(
        <div className={styles.areaOneDiv}>
            <AreaOneCard icon={<Smiley className={styles.googleIcon} />} title='Easy to use' text="Manage your habits everyday with a few clicks, enjoy the multiples features and fonctionalities" />
            <AreaOneCard icon={<CheckCircle className={styles.googleIcon} />} title='Very effective' text="Designed following reasearch backed up informations about habit building and habit maintening" />
            <AreaOneCard icon={<Heart className={styles.googleIcon} />} title='Entirely free' text="The whole app is entirely for free. You have access to all the features for free forever" />
        </div>
    )
}

export default BreakAreaOne