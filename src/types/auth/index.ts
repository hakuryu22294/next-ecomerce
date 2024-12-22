export type TLoginAuth = {
  email: string
  password: string
}

export type TRegisterAuth = {
  email: string
  password: string
  name: string
}

export type TChangePassword = {
  currentPassword: string
  newPassword: string
}
