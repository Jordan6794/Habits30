import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export function TableSkeleton() {
	return (
		<>
			{[...new Array(5)].map((_, index) => (
					<tr key={index}>
						<th>
							<Skeleton
								count={1}
								height="40px"
								baseColor="#ebebeb"
								highlightColor="#f5f5f5"
							/>
						</th>
						{[...new Array(15)].map((_, index) => (
							<th key={index}>
								<Skeleton height="40px" />
							</th>
						))}
					</tr>
			))}
		</>
	)
}
