import axios from 'axios'

//**config */
import { CONFIG_API } from 'src/configs/api'

//**types */
import { TLoginAuth } from 'src/types/auth'

export const loginAuth = async (data: TLoginAuth) => {
  console.log('API::', CONFIG_API.AUTH.INDEX)
  try {
    const res = await axios.post(`${CONFIG_API.AUTH.INDEX}/login`, data)

    return res.data
  } catch (e) {
    return null
  }
}

export const logoutAuth = async () => {
  try {
    await axios.post(`${CONFIG_API.AUTH.INDEX}/logout`)
  } catch (e) {
    return null
  }
}
