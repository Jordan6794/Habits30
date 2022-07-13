import { FunctionComponent } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

const BarChartComponent: FunctionComponent<{data: Array<{name: string, Successes: number | string}>}> = ({data}) => {

	return (
		// <ResponsiveContainer width="100%" height="100%">
			<BarChart
				width={500}
				height={300}
				data={data}
				margin={{
					top: 5,
					right: 30,
					left: 20,
					bottom: 5,
				}}
			>
				<CartesianGrid strokeDasharray="3 3" />
				<XAxis dataKey="name" />
				<YAxis />
				<Tooltip />
				{/* <Legend /> */}
				<Bar dataKey="Successes" fill="#82ca9d" />
			</BarChart>
		// </ResponsiveContainer>
	)
}

export default BarChartComponent
