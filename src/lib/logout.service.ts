
export function logout() {
    localStorage.removeItem('User')
    window.location.reload()
}