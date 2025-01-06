import { CONFIG_API } from 'src/configs/api'
import instanceAxios from 'src/helpers/axios'
import { TParamsGetRoles } from 'src/types/role'

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
