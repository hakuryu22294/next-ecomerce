// ** React Imports
import { createContext, useState, ReactNode, useEffect } from 'react'

// ** Next Import
import { useRouter } from 'next/router'

// ** Axios
// import axios from 'axios'

// ** Config
import authConfig from 'src/configs/auth'

// ** Types
import { AuthValuesType, LoginParams, ErrCallbackType, UserDataType } from './types'
import { loginAuth, logoutAuth } from 'src/services/auth'
import { CONFIG_API } from 'src/configs/api'
import { clearUserData, setLocalUserData } from 'src/helpers/storage'
import instanceAxios from 'src/helpers/axios'
import { error } from 'console'

// ** Defaults
const defaultProvider: AuthValuesType = {
  user: null,
  loading: true,
  setUser: () => null,
  setLoading: () => Boolean,
  login: () => Promise.resolve(),
  logout: () => Promise.resolve()
}

const AuthContext = createContext(defaultProvider)

type Props = {
  children: ReactNode
}

const AuthProvider = ({ children }: Props) => {
  // ** States
  const [user, setUser] = useState<UserDataType | null>(defaultProvider.user)
  const [loading, setLoading] = useState<boolean>(defaultProvider.loading)

  // ** Hooks
  const router = useRouter()

  useEffect(() => {
    const initAuth = async (): Promise<void> => {
      const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)!
      if (storedToken) {
        setLoading(true)
        await instanceAxios
          .get(CONFIG_API.AUTH.ME)
          .then(async response => {
            setLoading(false)
            setUser({ ...response.data.data })
          })
          .catch(() => {
            clearUserData()
            setUser(null)
            setLoading(false)
            if (!router.pathname.includes('login')) {
              router.replace('/login')
            }
          })
      } else {
        setLoading(false)
      }
    }

    initAuth()
  }, [])

  const handleLogin = (params: LoginParams, errorCallback?: ErrCallbackType) => {
    setLoading(true)
    loginAuth({ email: params.email, password: params.password })
      .then(async response => {
        const { access_token, refresh_token, user } = response.data
        if (access_token && refresh_token && user) {
          params.rememberMe ? setLocalUserData(JSON.stringify(user), access_token, refresh_token) : null
        }
        const returnUrl = router.query.returnUrl
        setUser(user)
        const redirectURL = returnUrl && returnUrl !== '/' ? returnUrl : '/'
        setLoading(false)
        router.replace(redirectURL as string)
      })

      .catch(err => {
        setLoading(false)
        if (errorCallback) errorCallback(err)
      })
  }

  const handleLogout = () => {
    logoutAuth().then(() => {
      setUser(null)
      clearUserData()
      router.push('/login')
    })
  }

  const values = {
    user,
    loading,
    setUser,
    setLoading,
    login: handleLogin,
    logout: handleLogout
  }

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
}

export { AuthContext, AuthProvider }
