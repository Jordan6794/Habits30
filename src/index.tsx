//jshint esversion:6
import React from 'react'
import ReactDOM from 'react-dom'
import reportWebVitals from './reportWebVitals'
import { BrowserRouter } from 'react-router-dom'
import { GoogleOAuthProvider } from '@react-oauth/google'

import App from './components/App'
import { Provider } from 'react-redux'
import store from './store'
import './index.css'

ReactDOM.render(
	<React.StrictMode>
		<GoogleOAuthProvider clientId={process.env.REACT_APP_GAUTH_CLIENT_ID ?? ''}>
			<Provider store={store}>
				<BrowserRouter>
					<App />
				</BrowserRouter>
			</Provider>
		</GoogleOAuthProvider>
	</React.StrictMode>,
	document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
