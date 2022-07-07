import { FunctionComponent, useState } from "react";

import styles from './HabitEditModal.module.css'

const HabitEditModal: FunctionComponent<{name: string, saveName: (newName: string) => void ,exitModal: () => void}> = (props) => {
    const [name, setName] = useState(props.name)

    function handleNameChange(event: React.ChangeEvent<HTMLInputElement>){
        setName(event.target.value)
    }

    function onExitModal(){
        props.exitModal()
    }

    function handleSave(){
        props.saveName(name)
        props.exitModal()
    }

    return(
        <>
			<div className='backdrop' onClick={onExitModal}></div>
			<div className='editModal'>
				<span className={styles.close} onClick={onExitModal}></span>
                <div className={styles.contentContainer}>
                    <div className={styles.inputDiv}>
                        <input className={styles.input} value={name} onChange={handleNameChange} />
                    </div>
                    <div className={styles.buttonsDiv}>
                        <button className={`btn btn-primary ${styles.btnModal}`} onClick={handleSave}>Save</button>
                        <button className={`btn btn-primary ${styles.btnModal}`} onClick={onExitModal}>Cancel</button>
                    </div>
                </div>
			</div>
		</>
    )
}

export default HabitEditModal