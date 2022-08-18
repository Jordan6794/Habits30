import { FunctionComponent, useEffect, useRef, useState } from 'react'
import HowToCard from './HowToCard'


import AddSVG from './SVG/AddBoxSVG'
import SummarizeSVG from './SVG/SummarizeSVG'
import CalculateSVG from './SVG/CalculateSVG'

import styles from './LandingPage.module.css'

const HowToArea: FunctionComponent = () => {
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
	return (
        <div className={`${styles.howToDiv} ${didIntersect && styles.howToIntersected}`}>
            <h1 ref={divRef} className={`${styles.howToTitle} ${styles.underline}`}>How To Use</h1> 
            <div className={styles.howToCardsDiv}>
                <HowToCard icon={<AddSVG />} number="1." title="Add" text="Add new habits that you want to implement in your life." />
                <HowToCard icon={<SummarizeSVG />} number="2." title="Report" text="Everyday, report if you have been successful or not to implement your habits" />
                <HowToCard icon={<CalculateSVG />} number="3." title="Watch" text="Our algorithm automatically calculates and displays your habits status" />
            </div>
        </div>
    )
}

export default HowToArea
