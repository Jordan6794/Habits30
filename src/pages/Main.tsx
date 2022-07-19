import { FunctionComponent } from 'react'
import MainHero from '../components/Main/Hero/MainHero'
import NavBar from '../components/NavBar/NavBar'
import Table from '../components/Main/Table/Table'

const Main: FunctionComponent = () => {
	return (
		<>
			<NavBar />
			<MainHero />
			<Table />
		</>
	)
}

export default Main
