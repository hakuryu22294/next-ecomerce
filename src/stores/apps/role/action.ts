import { createAsyncThunk } from '@reduxjs/toolkit'

// ** Role Services
import { createRole, deleteRole, getAllRoles, updateRole } from 'src/services/role'
import { TParamsCreateRole, TParamsEditRole, TParamsGetRoles } from 'src/types/role'

// ** Add User
export const getRolesAction = createAsyncThunk('role/getRoles', async (data: { params: TParamsGetRoles }) => {
  const response = await getAllRoles(data.params)

  return response.data
})

export const createRoleAction = createAsyncThunk('role/createRole', async (data: TParamsCreateRole) => {
  const response = await createRole(data)
  if (response?.data) {
    return response
  }

  return {
    data: null,
    message: response?.response?.data?.message,
    typeError: response?.response?.data?.typeError
  }
})

export const updateRoleAction = createAsyncThunk('role/updateRole', async (data: TParamsEditRole) => {
  const response = await updateRole(data)
  if (response?.data) {
    return response
  }

  return {
    data: null,
    message: response?.response?.data?.message,
    typeError: response?.response?.data?.typeError
  }
})

export const deleteRoleAction = createAsyncThunk('role/deleteRole', async (id: string) => {
  const response = await deleteRole(id)
  if (response.data) {
    return response
  }

  return {
    data: null,
    message: response?.response?.data?.message,
    typeError: response?.response?.data?.typeError
  }
})
