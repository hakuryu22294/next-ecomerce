//**config */
import axios from 'axios'
import { CONFIG_API } from 'src/configs/api'

// ** Instance Axios
import instanceAxios from 'src/helpers/axios'

//**types */
import { TLoginAuth, TRegisterAuth } from 'src/types/auth'

export const loginAuth = async (data: TLoginAuth) => {
  try {
    const res = await instanceAxios.post(`${CONFIG_API.AUTH.INDEX}/login`, data)

    return res.data
  } catch (e) {
    return null
  }
}

export const logoutAuth = async () => {
  try {
    const res = await instanceAxios.post(`${CONFIG_API.AUTH.INDEX}/logout`)

    return res.data
  } catch (e) {
    return null
  }
}

export const registerAuth = async (data: TRegisterAuth) => {
  try {
    const res = await axios.post(`${CONFIG_API.AUTH.INDEX}/register`, data)

    return res.data
  } catch (e) {
    return e
  }
}

export const updateAuthMe = async (data: any) => {
  try {
    const res = await axios.put(`${CONFIG_API.AUTH.INDEX}/me`, data)

    return res.data
  } catch (e) {
    return e
  }
}
