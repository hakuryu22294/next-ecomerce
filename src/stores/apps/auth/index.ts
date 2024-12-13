// ** Redux Imports
import { Dispatch } from 'redux'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

//** Auth Actions */
import { registerAuthAction } from './action'

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
  isError: false,
  message: '',
  typeError: ''
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    resetInitState: state => {
      state.isLoading = false
      state.isSuccess = false
      state.isError = false
      state.message = ''
      state.typeError = ''
    }
  },
  extraReducers: builder => {
    builder
      .addCase(registerAuthAction.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = !!action.payload?.data?.email
        state.isError = !action.payload?.data?.email
        state.message = action.payload?.message
        state.typeError = action.payload?.typeError
      })
      .addCase(registerAuthAction.rejected, (state, action) => {
        state.isLoading = false
        state.isSuccess = false
        state.isError = true
        state.message = ''
        state.typeError = ''
      })
      .addCase(registerAuthAction.pending, (state, action) => {
        state.isLoading = true
      })
  }
})

export const { resetInitState } = authSlice.actions

export default authSlice.reducer
