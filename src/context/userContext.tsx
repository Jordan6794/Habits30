import React, { useState } from 'react'
const UserContext = React.createContext(undefined)

function UserContextProvider(props) {
	const [user, setUser] = useState(null)

	return (
		<UserContext.Provider value={{ user, setUser }}>
			{props.children}
		</UserContext.Provider>
	)
}

export {UserContextProvider, UserContext}