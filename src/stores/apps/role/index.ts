// ** Redux Imports
import { Dispatch } from 'redux'
import { createSlice } from '@reduxjs/toolkit'
import { createRoleAction, getRolesAction } from './action'

//**  Actions */

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
  isSuccessCreateEdit: false,
  isErrorCreateEdit: false,
  messageCreateEdit: '',
  isSuccessDelete: false,
  isErrorDelete: false,
  messageDelete: '',
  typeError: '',
  roles: {
    data: [],
    totalCount: 0
  }
}

export const roleSlice = createSlice({
  name: 'role',
  initialState,
  reducers: {
    resetInitState: state => {
      state.isLoading = false
      state.isSuccess = false
      state.isError = false
    }
  },
  extraReducers: builder => {
    //** get Roles */
    builder
      .addCase(getRolesAction.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.isSuccess = true
        state.isError = false
        state.roles.data = Array.isArray(payload.roles) ? payload.roles : []
        state.roles.totalCount = payload.totalCount
      })
      .addCase(getRolesAction.rejected, state => {
        state.isLoading = false
        state.isSuccess = false
        state.isError = true
        state.roles.data = []
        state.roles.totalCount = 0
      })
      .addCase(getRolesAction.pending, state => {
        state.isLoading = true
      })
    builder
      .addCase(createRoleAction.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.isSuccessCreateEdit = !!payload.data
        state.isErrorCreateEdit = !payload.data
        state.messageCreateEdit = payload.data.message
        state.typeError = payload.data.typeError
      })
      .addCase(createRoleAction.rejected, (state, action) => {
        state.isLoading = false

        // state.isSuccessCreateEdit = !!payload.data
        // state.isErrorCreateEdit = !payload.data
        // state.messageCreateEdit = payload.data.message
        // state.typeError = payload.data.typeError
      })
  }
})

export const { resetInitState } = roleSlice.actions

export default roleSlice.reducer
