import { FunctionComponent } from 'react'

const CheckCircleSVG: FunctionComponent<{className?: string}> = (props) => {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" className={props.className ? props.className : ''} viewBox="0 0 24 24">
  <g>
    <path d="M12,2A10,10,0,1,0,22,12,10.011,10.011,0,0,0,12,2Zm0,18a8,8,0,1,1,8-8A8.009,8.009,0,0,1,12,20Z"/>
  </g>
</svg>
	)
}

export default CheckCircleSVG
