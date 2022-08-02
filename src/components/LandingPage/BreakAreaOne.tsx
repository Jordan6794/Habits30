import { FunctionComponent, useEffect, useRef, useState } from "react"
import AreaOneCard from "./AreaOneCard"

import CheckCircleSVG from './SVG/CheckCircleSVG'
import HeartSVG from './SVG/HeartSVG'
import SmileySVG from './SVG/SmileySVG'

import styles from './LandingPage.module.css'

const BreakAreaOne: FunctionComponent = () => {
    const [didIntersect, setDidIntersect] = useState(false)
    const divRef = useRef(null)

    useEffect(() => {
        const options = { root: null, rootMargin: '0px', threshold: 0.9 };
        const observer = new IntersectionObserver((entries, observer) => {
            handleIntersect(entries, observer); 
          }, options)
        if(divRef.current){
            observer.observe(divRef.current)
        }

        return (() => {
            observer.disconnect()
        })
    }, [])

    function handleIntersect(entries: IntersectionObserverEntry[], observer: IntersectionObserver){
        entries.forEach(entry => {
            if(entry.isIntersecting){
                setDidIntersect(true)
                observer.unobserve(entry.target);
            }
        })
    }

    return(
        <div ref={divRef} className={`${styles.areaOneDiv} ${didIntersect && styles.breakOneIntersected}`}>
            <AreaOneCard icon={<SmileySVG />} title='Easy to use' text="Manage all your habits everyday with a few clicks, enjoy the multiples features and functionalities." />
            <AreaOneCard icon={<CheckCircleSVG />} title='Very effective' text="Designed following research backed up studies about habit building and habit maintaining." />
            <AreaOneCard icon={<HeartSVG />} title='Entirely free' text="The whole app is entirely free. You have access to all the features for free without any limitation." />
        </div>
    )
}

export default BreakAreaOne