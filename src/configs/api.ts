const API_URL = process.env.NEXT_PUBLIC_API_URL

export const CONFIG_API = {
  AUTH: {
    INDEX: `${API_URL}/auth`,
    ME: `${API_URL}/auth/me`,
    CHANGE_PASSWORD: `${API_URL}/auth/change-password`
  },
  ROLE: {
    INDEX: `${API_URL}/role`
  }
}
