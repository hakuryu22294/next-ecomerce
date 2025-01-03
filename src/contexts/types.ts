export type ErrCallbackType = (err: { [key: string]: string }) => void

export type LoginParams = {
  email: string
  password: string
  rememberMe?: boolean
}

export type UserDataType = {
  id: number
  role: {
    name: string
    permissions: string[]
  }
  email: string
  firstName: string
  lastName: string
  middleName: string
  username: string
  password: string
  avatar?: string | null
  phoneNumber?: string
  address?: string
  city?: string
}

export type AuthValuesType = {
  loading: boolean
  logout: () => void
  user: UserDataType | null
  setLoading: (value: boolean) => void
  setUser: (value: UserDataType | null) => void
  login: (params: LoginParams, errorCallback?: ErrCallbackType) => void
}
