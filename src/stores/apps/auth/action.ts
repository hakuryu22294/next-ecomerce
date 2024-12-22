import { createAsyncThunk } from '@reduxjs/toolkit'

// ** Auth Services
import { changeNewPassword, registerAuth, updateAuthMe } from 'src/services/auth'
import { TChangePassword } from 'src/types/auth'

// ** Add User
export const registerAuthAction = createAsyncThunk('auth/register', async (data: any) => {
  const response = await registerAuth(data)
  if (response.data) {
    return response
  }

  return {
    data: null,
    message: response.response?.data?.message,
    typeError: response.response?.data?.typeError
  }
})

export const updateAuthMeAction = createAsyncThunk('auth/updateAuthMe', async (data: any) => {
  const response = await updateAuthMe(data)
  if (response.data) {
    return response
  }

  return {
    data: null,
    message: response.response?.data?.message,
    typeError: response.response?.data?.typeError
  }
})

export const changePasswordMeAction = createAsyncThunk('auth/changePasswordMe', async (data: TChangePassword) => {
  const response = await changeNewPassword(data)
  if (response.status === 'Success') {
    return { ...response, data: 1 }
  }

  return {
    data: null,
    message: response.response?.data?.message,
    typeError: response.response?.data?.typeError
  }
})
