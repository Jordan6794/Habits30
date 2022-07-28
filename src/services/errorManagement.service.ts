
export const matchErrorToMessage = (error: string) =>{
    const noUser = 'No user with this email.'
    const invalidCredentials = 'Invalid credentials.'
    const emailAlreadyExists = 'There is already a user with this email.'
    const passwordDontMatch = "Passwords don't match."

    switch(error){
        case noUser:
            return noUser
        case invalidCredentials:
            return invalidCredentials
        case emailAlreadyExists:
            return emailAlreadyExists
        case passwordDontMatch:
            return passwordDontMatch
        default:
            return 'Something went wrong. Please try again.'
    }
}