// ** Redux Imports
import { Dispatch } from 'redux'
import { createSlice } from '@reduxjs/toolkit'

//** Auth Actions */
import { registerAuthAction, updateAuthMeAction, changePasswordMeAction } from './action'
import { useTranslation } from 'react-i18next'

interface DataParams {
  q: string
  role: string
  status: string
  currentPlan: string
}

interface Redux {
  getState: any
  dispatch: Dispatch<any>
}

const initialState = {
  isLoading: false,
  isSuccess: false,
  message: '',
  typeError: '',
  isError: false,
  isSuccessUpdateMe: false,
  isErrorUpdateMe: false,
  messageUpdateMe: '',
  isSuccessChangePassword: false,
  isErrorChangePassword: false,
  messageChangePassword: ''
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    resetInitState: state => {
      state.isLoading = false
      state.isSuccess = false
      state.isError = false
      state.isErrorUpdateMe = false
      state.isSuccessUpdateMe = false
      state.messageUpdateMe = ''
      state.message = ''
      state.typeError = ''
      state.isSuccessChangePassword = false
      state.isErrorChangePassword = false
      state.messageChangePassword = ''
    }
  },
  extraReducers: builder => {
    //** Register */
    builder
      .addCase(registerAuthAction.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = !!action.payload?.data?.email
        state.isError = !action.payload?.data?.email
        state.message = action.payload?.message
        state.typeError = action.payload?.typeError
      })
      .addCase(registerAuthAction.rejected, state => {
        state.isLoading = false
        state.isSuccess = false
        state.isError = true
        state.message = ''
        state.typeError = ''
      })
      .addCase(registerAuthAction.pending, state => {
        state.isLoading = true
      })

    //**Update Me */
    builder
      .addCase(updateAuthMeAction.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccessUpdateMe = !!action.payload?.data?.email
        state.isErrorUpdateMe = !action.payload?.data?.email
        state.messageUpdateMe = action.payload?.message
        state.typeError = action.payload?.typeError
      })
      .addCase(updateAuthMeAction.rejected, state => {
        state.isLoading = false
        state.isSuccessUpdateMe = false
        state.isErrorUpdateMe = true
        state.messageUpdateMe = ''
        state.typeError = ''
      })
      .addCase(updateAuthMeAction.pending, state => {
        state.isLoading = true
      })

    //**Change Password */
    builder
      .addCase(changePasswordMeAction.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccessChangePassword = !!action.payload?.data
        state.isErrorChangePassword = !action.payload?.data
        state.messageChangePassword = action.payload?.message
        state.typeError = action.payload?.typeError
      })
      .addCase(changePasswordMeAction.rejected, state => {
        state.isLoading = false
        state.isSuccessChangePassword = false
        state.isErrorChangePassword = true
        state.messageChangePassword = ''
        state.typeError = ''
      })
      .addCase(changePasswordMeAction.pending, state => {
        state.isLoading = true
      })
  }
})

export const { resetInitState } = authSlice.actions

export default authSlice.reducer
