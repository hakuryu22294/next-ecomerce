import { createAsyncThunk } from '@reduxjs/toolkit'

// ** Auth Services
import { registerAuth } from 'src/services/auth'

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
