import { FunctionComponent } from 'react'
import Dashboard from '../components/Dashboard/Dashboard'
import Footer from '../components/Footer/Footer'
import NavBar from '../components/NavBar/NavBar'

//? 2 files dashboards.tsx fine ?
const DashboardPage: FunctionComponent = () => {
	return (
		<>
			<NavBar />
			<Dashboard />
			<Footer />
		</>
	)
}

export default DashboardPage
