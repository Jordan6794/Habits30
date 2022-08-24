import { FunctionComponent } from 'react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, Cell } from 'recharts'

const BarChartComponent: FunctionComponent<{ data: Array<{ name: string; Successes: number | string }>; colors: string[] }> = ({
	data,
	colors,
}) => {
	// reordering colors so that the fail colors is in first : it will corespond to smallest streak
	const reorderedColors=[colors[2], colors[0], colors[1], colors[3]]
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
					<Cell key={`cell-${index}`} fill={reorderedColors[index % colors.length]} />
				))}
			</Bar>
		</BarChart>
		// </ResponsiveContainer>
	)
}

export default BarChartComponent
