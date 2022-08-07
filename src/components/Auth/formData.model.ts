export interface FormData {
    email: string
    username: string
    password: string
    repeatPassword?: string
}

export interface GoogleAuthData {
    given_name: string
    email: string
    sub: string
}