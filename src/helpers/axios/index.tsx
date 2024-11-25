import React, { FC } from 'react'
import { NextRouter, useRouter } from 'next/router'

// ** Axios
import axios from 'axios'

// ** helpers
import { clearUserData, getLocalUserData } from '../storage'

//** jwt decode */
import { jwtDecode } from 'jwt-decode'

// ** Types
import { UserDataType } from 'src/contexts/types'

// ** Hooks
import { useAuth } from 'src/hooks/useAuth'

// ** Config
import { CONFIG_API } from 'src/configs/api'

type TAxiosInterceptor = {
  children: React.ReactNode
}

const instanceAxios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL
})

/**
 * Handles the redirection logic after a successful login.
 * This function should manage the navigation to the appropriate page
 * based on the user's authentication status or any other relevant condition.
 */
const hanldeRedirectLogin = (router: NextRouter, setUser: (data: UserDataType | null) => void) => {
  if (router.asPath !== '/') {
    router.replace({
      pathname: '/login',
      query: { returnUrl: router.asPath }
    })
  } else {
    router.replace('/login')
  }
  setUser(null)
  clearUserData()
}

const AxiosInterceptor: FC<TAxiosInterceptor> = ({ children }) => {
  const router = useRouter()
  const { setUser } = useAuth()

  instanceAxios.interceptors.request.use(async config => {
    const { accessToken, refreshToken } = getLocalUserData()
    if (accessToken) {
      const decodeAccessToken: any = jwtDecode(accessToken)
      if (decodeAccessToken?.exp > Date.now() / 1000) {
        config.headers['Authorization'] = `Bearer ${accessToken}`
      } else {
        if (refreshToken) {
          const decodeRefreshToken: any = jwtDecode(refreshToken)
          if (decodeRefreshToken?.exp > Date.now() / 1000) {
            await axios
              .post(`${CONFIG_API.AUTH.INDEX}/auth/refresh-token`, {
                headers: {
                  Authorization: `Bearer ${refreshToken}`
                }
              })
              .then(res => {
                const newAccessToken = res?.data?.data?.access_token
                if (newAccessToken) {
                  config.headers['Authorization'] = `Bearer ${newAccessToken}`
                } else {
                  hanldeRedirectLogin(router, setUser)
                }
              })
              .catch(err => {
                hanldeRedirectLogin(router, setUser)
              })
          } else {
          }
        } else {
          hanldeRedirectLogin(router, setUser)
        }
      }
    } else {
      hanldeRedirectLogin(router, setUser)
    }

    return config
  })

  instanceAxios.interceptors.response.use(response => {
    console.log('response::', response)

    return response
  })

  return <>{children}</>
}

export default instanceAxios

export { AxiosInterceptor }
