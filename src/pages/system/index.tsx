import { NextPage } from 'next'
import { ReactNode } from 'react'

//**views */

import UserLayout from 'src/views/layouts/UserLayout'
import ManagerSystemPage from 'src/views/pages/manager-system'

type TProps = {}
const ManagerSystem: NextPage<TProps> = () => {
  return <ManagerSystemPage />
}

export default ManagerSystem
ManagerSystem.getLayout = (page: ReactNode) => <UserLayout>{page}</UserLayout>
ManagerSystem.guestGuard = false
ManagerSystem.authGuard = true
