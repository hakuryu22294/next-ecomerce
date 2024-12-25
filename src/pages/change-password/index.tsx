import { NextPage } from 'next'
import BlankLayout from 'src/views/layouts/BlankLayout'
import ChangePasswordPage from 'src/views/pages/change-password'

type TProps = {}

const ChangePassword: NextPage<TProps> = () => <ChangePasswordPage />

export default ChangePassword

ChangePassword.getLayout = page => <BlankLayout>{page}</BlankLayout>
ChangePassword.guestGuard = false
ChangePassword.authGuard = true
