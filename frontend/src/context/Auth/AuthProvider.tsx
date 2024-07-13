import { FC, PropsWithChildren, useState } from "react";
import { AuthContext } from "./AuthContext"

const USERNAME_KEY = "username"
const TOKEN_KEY = "token"

const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
    const [username, setUsername] = useState<string | null>(localStorage.getItem(USERNAME_KEY))
    const [token, setToken] = useState<string | null>(localStorage.getItem(TOKEN_KEY))

    const isAuthenticated = !!token

    // useEffect(() => {
    //     const localUsername = localStorage.getItem(USERNAME_KEY)
    //     const localToken = localStorage.getItem(TOKEN_KEY)
    //     if (username && token) {
    //         setUsername(localUsername)
    //         setToken(localToken)
    //     }
    // }, [])

    const login = (username: string, token: string) => {
        setUsername(username)
        setToken(token)
        localStorage.setItem(USERNAME_KEY, username)
        localStorage.setItem(TOKEN_KEY, token)
    }

    const logout = () => {
        localStorage.getItem(USERNAME_KEY)
        localStorage.getItem(TOKEN_KEY)
        setUsername(null)
        setToken(null)
    }

    return (
        <AuthContext.Provider value={{ username, token, isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider