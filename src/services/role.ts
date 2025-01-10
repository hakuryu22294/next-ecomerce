import { CONFIG_API } from 'src/configs/api'
import instanceAxios from 'src/helpers/axios'
import { TParamsCreateRole, TParamsDeleteRole, TParamsEditRole, TParamsGetRoles } from 'src/types/role'

export const getAllRoles = async (params: TParamsGetRoles) => {
  try {
    const res = await instanceAxios.get(`${CONFIG_API.ROLE.INDEX}`, {
      params
    })

    return res.data
  } catch (e) {
    return e
  }
}

export const createRole = async (data: TParamsCreateRole) => {
  try {
    const res = await instanceAxios.post(`${CONFIG_API.ROLE.INDEX}`, data)

    return res.data
  } catch (e) {
    return e
  }
}

export const updateRole = async (data: TParamsEditRole) => {
  try {
    const { id, ...rests } = data
    const res = await instanceAxios.put(`${CONFIG_API.ROLE.INDEX}/${id}`, rests)

    return res.data
  } catch (e) {
    return e
  }
}

export const deleteRole = async (id: string) => {
  try {
    const res = await instanceAxios.delete(`${CONFIG_API.ROLE.INDEX}/${id}`)

    return res.data
  } catch (e) {
    return e
  }
}
