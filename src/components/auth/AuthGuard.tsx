/* eslint-disable @typescript-eslint/no-unused-vars */
// ** React Imports
import { useRouter } from 'next/router'
import { ReactNode, ReactElement, useEffect } from 'react'
import { ACCESS_TOKEN, TEMPORARY_TOKEN, USER_DATA } from 'src/configs/auth'
import { clearTemporaryToken, clearUserData, getTemporaryToken } from 'src/helpers/storage'
import { useAuth } from 'src/hooks/useAuth'

interface AuthGuardProps {
  children: ReactNode
  fallback: ReactElement | null
}

const AuthGuard = (props: AuthGuardProps) => {
  const { children, fallback } = props
  const authContext = useAuth()
  const router = useRouter()
  useEffect(() => {
    const { temporaryToken } = getTemporaryToken()
    if (!router.isReady) {
      return
    }
    if (
      authContext.user === null &&
      !window.localStorage.getItem(ACCESS_TOKEN) &&
      !window.localStorage.getItem(USER_DATA) &&
      !temporaryToken
    ) {
      if (router.asPath !== '/' && router.asPath !== '/login') {
        router.replace({
          pathname: '/login',
          query: { returnUrl: router.asPath }
        })
      } else {
        router.replace('/login')
      }
      authContext.setUser(null)
      clearUserData()
    }
  }, [router.route])

  useEffect(() => {
    const handleUpload = () => {
      clearTemporaryToken()
    }
    window.addEventListener('beforeunload', handleUpload)

    return () => window.removeEventListener('beforeunload', handleUpload)
  }, [])
  if (authContext.loading || authContext.user === null) return fallback
  console.log(authContext.user)

  return <>{children}</>
}

export default AuthGuard
