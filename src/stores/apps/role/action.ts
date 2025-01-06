import { createAsyncThunk } from '@reduxjs/toolkit'

// ** Role Services
import { getAllRoles } from 'src/services/role'
import { TParamsGetRoles } from 'src/types/role'

// ** Add User
export const getRolesAction = createAsyncThunk('role/getRoles', async (data: { params: TParamsGetRoles }) => {
  const response = await getAllRoles(data.params)

  return response.data
})
