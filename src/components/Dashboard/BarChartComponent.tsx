import { FunctionComponent } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts'

const BarChartComponent: FunctionComponent<{ data: Array<{ name: string; Successes: number | string }>; colors: string[] }> = ({
	data,
	colors,
}) => {
	return (
		// <ResponsiveContainer width="100%" height="100%">
		<BarChart
			width={400}
			height={240}
			data={data}
			margin={{
				top: 5,
				right: 30,
				left: 20,
				bottom: 5,
			}}
		>
			{/* <CartesianGrid strokeDasharray="3 3" /> */}
			<XAxis dataKey="name" />
			<YAxis />
			<Tooltip />
			{/* <Legend /> */}

			<Bar dataKey="Successes">
				{data.map((entry, index) => (
					<Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
				))}
			</Bar>
		</BarChart>
		// </ResponsiveContainer>
	)
}

export default BarChartComponent
