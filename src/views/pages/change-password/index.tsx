//MUI
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  IconButton,
  InputAdornment,
  Typography,
  useTheme
} from '@mui/material'

//NEXT
import { NextPage } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

//** FORM */
import { Controller, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { PASSWORD_REG } from 'src/configs/regex'

//** Component */
import IconifyIcon from 'src/components/Icon'
import CustomTextField from 'src/components/text-field'
import Spinner from 'src/components/spinner'

//IMAGE
import registerDark from 'public/images/register-dark.png'

//** Redux */
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from 'src/stores'
import { resetInitState } from 'src/stores/apps/auth'

//** toast */
import toast from 'react-hot-toast'

//** Config */
import { ROUTE_CONFIG } from 'src/configs/route'
import { useTranslation } from 'react-i18next'
import { changePasswordMeAction } from 'src/stores/apps/auth/action'
import { logoutAuth } from 'src/services/auth'
import { useAuth } from 'src/hooks/useAuth'

type TProps = {}

type TDefaultValues = {
  currentPassword: string
  newPassword: string
  confirmNewPassword: string
}

const ChangePasswordPage: NextPage<TProps> = () => {
  //** State
  const [showCurrentPassword, setShowCurrentPassword] = useState<boolean>(false)
  const [showNewPassword, setShowNewPassword] = useState<boolean>(false)
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState<boolean>(false)

  //** i18n */
  const { t } = useTranslation()

  // ** auth context

  const { logout } = useAuth()

  //** Router */
  const router = useRouter()

  //** Redux */
  const dispatch: AppDispatch = useDispatch()
  const { isLoading, isErrorChangePassword, isSuccessChangePassword, messageChangePassword } = useSelector(
    (state: RootState) => state.auth
  )

  //** Theme */
  const theme = useTheme()

  const schema = yup.object().shape({
    currentPassword: yup
      .string()
      .required('Password is required')
      .matches(
        PASSWORD_REG,
        'Password includes at least 8 characters, 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character'
      ),
    newPassword: yup
      .string()
      .required('Password is required')
      .matches(
        PASSWORD_REG,
        'Password includes at least 8 characters, 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character'
      ),
    confirmNewPassword: yup
      .string()
      .required('Confirm password is required')
      .matches(
        PASSWORD_REG,
        'Confirm password includes at least 8 characters, 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character'
      )
      .oneOf([yup.ref('newPassword'), ''], 'Password does not match')
  })
  const {
    handleSubmit,
    formState: { errors },
    control
  } = useForm({
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmNewPassword: ''
    },
    mode: 'onChange',
    resolver: yupResolver(schema)
  })

  const onSubmit = (data: { currentPassword: string; newPassword: string }) => {
    if (!Object.keys(errors).length) {
      dispatch(
        changePasswordMeAction({
          currentPassword: data.currentPassword,
          newPassword: data.newPassword
        })
      )
    }
  }

  useEffect(() => {
    if (messageChangePassword) {
      if (isErrorChangePassword) {
        toast.error(messageChangePassword)
      } else if (isSuccessChangePassword) {
        toast.success(messageChangePassword)
        setTimeout(() => {
          logout()
        }, 500)
        router.push(ROUTE_CONFIG.LOGIN)
      }
      dispatch(resetInitState())
    }
  }, [isErrorChangePassword, isSuccessChangePassword, messageChangePassword])

  return (
    <>
      {isLoading && <Spinner />}
      <Box
        sx={{
          backgroundColor: theme.palette.background.paper,
          height: '100vh',
          width: '100vw',
          display: 'flex',
          alignItems: 'center',
          padding: '40px'
        }}
      >
        <Box
          display={{ md: 'flex', xs: 'none' }}
          sx={{
            alignItems: 'center',
            borderRadius: '20px',
            backgroundColor: theme.palette.customColors.bodyBg,
            height: '100%',
            minWidth: '50vw'
          }}
        >
          <Image src={registerDark} alt='login-dark' priority />
        </Box>
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            flex: 1
          }}
        >
          <Typography component='h1' variant='h5'>
            {t('change_password')}
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)} autoComplete='off'>
            <Box sx={{ mt: 2, width: '400px' }}>
              <Controller
                rules={{
                  maxLength: 100
                }}
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <CustomTextField
                    required
                    fullWidth
                    label={t('current_password')}
                    type={showCurrentPassword ? 'text' : 'password'}
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                    placeholder={t('enter_current_password')}
                    error={Boolean(errors.currentPassword)}
                    helperText={errors.currentPassword?.message}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position='end'>
                          <IconButton edge='end' onClick={() => setShowCurrentPassword(!showCurrentPassword)}>
                            {showCurrentPassword ? (
                              <IconifyIcon icon='eva:eye-fill' />
                            ) : (
                              <IconifyIcon icon='eva:eye-off-fill' />
                            )}
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
                  />
                )}
                name='currentPassword'
              />
            </Box>
            <Box sx={{ mt: 2, width: '400px' }}>
              <Controller
                rules={{
                  maxLength: 100
                }}
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <CustomTextField
                    required
                    fullWidth
                    label={t('new_password')}
                    type={showNewPassword ? 'text' : 'password'}
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                    placeholder={t('enter_new_password')}
                    error={Boolean(errors.newPassword)}
                    helperText={errors.newPassword?.message}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position='end'>
                          <IconButton edge='end' onClick={() => setShowNewPassword(!showNewPassword)}>
                            {showNewPassword ? (
                              <IconifyIcon icon='eva:eye-fill' />
                            ) : (
                              <IconifyIcon icon='eva:eye-off-fill' />
                            )}
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
                  />
                )}
                name='newPassword'
              />
            </Box>
            <Box sx={{ mt: 2, width: '400px' }}>
              <Controller
                rules={{
                  maxLength: 100
                }}
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <CustomTextField
                    required
                    fullWidth
                    label={t('confirm_new_password')}
                    type={showConfirmNewPassword ? 'text' : 'password'}
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                    placeholder={t('enter_confirm_new_password')}
                    error={Boolean(errors.confirmNewPassword)}
                    helperText={errors.confirmNewPassword?.message}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position='end'>
                          <IconButton edge='end' onClick={() => setShowConfirmNewPassword(!showConfirmNewPassword)}>
                            {showConfirmNewPassword ? (
                              <IconifyIcon icon='eva:eye-fill' />
                            ) : (
                              <IconifyIcon icon='eva:eye-off-fill' />
                            )}
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
                  />
                )}
                name='confirmNewPassword'
              />
            </Box>
            <Link style={{ color: theme.palette.primary.main }} href='#'>{t('forgot_password')}</Link>
            <Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
              {t('change_password')}
            </Button>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}>
              <Typography>{t('you_have_an_account')}</Typography>

              <Link style={{ color: theme.palette.primary.main }} href='/login'>{t('sign_in')}</Link>
            </Box>
            <Typography sx={{ textAlign: 'center', my: 2 }}>Or</Typography>
            <Box>
              <IconButton sx={{ color: theme.palette.primary.main }}>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  aria-hidden='true'
                  role='img'
                  fontSize='1.375rem'
                  className='iconify iconify--mdi'
                  width='1.5em'
                  height='1.5em'
                  viewBox='0 0 24 24'
                >
                  <path
                    fill='currentColor'
                    d='M12 2.04c-5.5 0-10 4.49-10 10.02c0 5 3.66 9.15 8.44 9.9v-7H7.9v-2.9h2.54V9.85c0-2.51 1.49-3.89 3.78-3.89c1.09 0 2.23.19 2.23.19v2.47h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.45 2.9h-2.33v7a10 10 0 0 0 8.44-9.9c0-5.53-4.5-10.02-10-10.02Z'
                  ></path>
                </svg>
              </IconButton>
              <IconButton sx={{ color: theme.palette.error.main }}>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  aria-hidden='true'
                  role='img'
                  fontSize='1.375rem'
                  className='iconify iconify--mdi'
                  width='1.5em'
                  height='1.5em'
                  viewBox='0 0 24 24'
                >
                  <path
                    fill='currentColor'
                    d='M21.35 11.1h-9.17v2.73h6.51c-.33 3.81-3.5 5.44-6.5 5.44C8.36 19.27 5 16.25 5 12c0-4.1 3.2-7.27 7.2-7.27c3.09 0 4.9 1.97 4.9 1.97L19 4.72S16.56 2 12.1 2C6.42 2 2.03 6.8 2.03 12c0 5.05 4.13 10 10.22 10c5.35 0 9.25-3.67 9.25-9.09c0-1.15-.15-1.81-.15-1.81Z'
                  ></path>
                </svg>
              </IconButton>
            </Box>
          </form>
        </Box>
      </Box>
    </>
  )
}

export default ChangePasswordPage
