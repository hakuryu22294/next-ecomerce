import { createAsyncThunk } from '@reduxjs/toolkit'

// ** Role Services
import { getAllRoles } from 'src/services/role'

// ** Add User
export const getRolesAction = createAsyncThunk('role/getRoles', async (data: any) => {
  const response = await getAllRoles(data)

  return response
})
