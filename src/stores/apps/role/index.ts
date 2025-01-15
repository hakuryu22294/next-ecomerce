// ** Redux Imports
import { Dispatch } from 'redux'
import { createSlice } from '@reduxjs/toolkit'
import { createRoleAction, deleteRoleAction, getRolesAction, updateRoleAction } from './action'

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
      state.isSuccessCreateEdit = false
      state.isErrorCreateEdit = false
      state.messageCreateEdit = ''
      state.isSuccessDelete = false
      state.isErrorDelete = false
      state.messageDelete = ''
      state.typeError = ''
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

      //** Create role */
      .addCase(createRoleAction.pending, state => {
        state.isLoading = true
      })
      .addCase(createRoleAction.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccessCreateEdit = !!action.payload?.data?._id
        state.isErrorCreateEdit = !action.payload?.data?._id
        state.messageCreateEdit = action.payload?.message
      })

      //** Update role */
      .addCase(updateRoleAction.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccessCreateEdit = !!action.payload?.data?._id
        state.isErrorCreateEdit = !action.payload?.data?._id
        state.messageCreateEdit = action.payload?.message
      })
      .addCase(updateRoleAction.pending, state => {
        state.isLoading = true
      })

      //** Delete role */
      .addCase(deleteRoleAction.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccessDelete = !!action.payload?.data?._id
        state.isErrorDelete = !action.payload?.data?._id
        state.messageDelete = action.payload?.message
      })
      .addCase(deleteRoleAction.pending, state => {
        state.isLoading = true
      })
  }
})

export const { resetInitState } = roleSlice.actions

export default roleSlice.reducer
