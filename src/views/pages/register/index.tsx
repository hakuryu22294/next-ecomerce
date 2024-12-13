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

//** FORM */
import { Controller, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { EMAIL_REG, PASSWORD_REG } from 'src/configs/regex'

//** Component */
import IconifyIcon from 'src/components/Icon'
import FallbackSpinner from 'src/components/fall-back'
import CustomTextField from 'src/components/text-field'

//IMAGE
import registerDark from 'public/images/register-dark.png'

//** Redux */
import { useDispatch, useSelector } from 'react-redux'
import { registerAuthAction } from 'src/stores/apps/auth/action'
import { AppDispatch, RootState } from 'src/stores'
import { resetInitState } from 'src/stores/apps/auth'

//** toast */
import toast from 'react-hot-toast'
import { useRouter } from 'next/router'
import { ROUTE_CONFIG } from 'src/configs/route'

type TProps = {}

const RegisterPage: NextPage<TProps> = () => {
  //** State
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false)

  const [isRemember, setIsRemember] = useState<boolean>(false)

  //** Router */
  const router = useRouter()

  //** Redux */
  const dispatch: AppDispatch = useDispatch()
  const { isLoading, isError, isSuccess, message, typeError } = useSelector((state: RootState) => state.auth)

  //** Theme */
  const theme = useTheme()

  const schema = yup.object().shape({
    email: yup.string().required('Email is required').matches(EMAIL_REG, 'Invalid email'),
    password: yup
      .string()
      .required('Password is required')
      .matches(
        PASSWORD_REG,
        'Password includes at least 8 characters, 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character'
      ),
    confirmPassword: yup
      .string()
      .required('Confirm password is required')
      .matches(
        PASSWORD_REG,
        'Confirm password includes at least 8 characters, 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character'
      )
      .oneOf([yup.ref('password'), ''], 'Password does not match')
  })
  const {
    handleSubmit,
    formState: { errors },
    control
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: ''
    },
    mode: 'onChange',
    resolver: yupResolver(schema)
  })

  const onSubmit = (data: { email: string; password: string; confirmPassword: string }) => {
    dispatch(
      registerAuthAction({
        email: data.email,
        password: data.password
      })
    )
  }

  useEffect(() => {
    console.log({ isError, isSuccess, message })
    if (message) {
      if (isError) {
        toast.error(message)
      } else if (isSuccess) {
        toast.success(message)
        router.push(ROUTE_CONFIG.LOGIN)
      }
      dispatch(resetInitState())
    }
  }, [isError, isSuccess, message])

  return (
    <>
      {isLoading && <FallbackSpinner />}
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
            Register
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)} autoComplete='off'>
            <Box>
              <Controller
                rules={{
                  required: true
                }}
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <CustomTextField
                    required
                    fullWidth
                    label='Email Address'
                    autoComplete='email'
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                    placeholder='Input your email'
                    error={Boolean(errors.email)}
                    helperText={errors.email?.message}
                  />
                )}
                name='email'
              />
            </Box>
            <Box sx={{ mt: 2 }}>
              <Controller
                rules={{
                  maxLength: 100
                }}
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <CustomTextField
                    required
                    fullWidth
                    label='Password'
                    type={showPassword ? 'text' : 'password'}
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                    placeholder='Input your password'
                    error={Boolean(errors.password)}
                    helperText={errors.password?.message}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position='end'>
                          <IconButton edge='end' onClick={() => setShowPassword(!showPassword)}>
                            {showPassword ? (
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
                name='password'
              />
            </Box>
            <Box sx={{ mt: 2 }}>
              <Controller
                rules={{
                  maxLength: 100
                }}
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <CustomTextField
                    required
                    fullWidth
                    label='Confirm Password'
                    type={showConfirmPassword ? 'text' : 'password'}
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                    placeholder='Enter confirm password'
                    error={Boolean(errors.password)}
                    helperText={errors.confirmPassword?.message}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position='end'>
                          <IconButton edge='end' onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                            {showConfirmPassword ? (
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
                name='confirmPassword'
              />
            </Box>

            <FormControlLabel
              control={
                <Checkbox
                  value='remember'
                  color='primary'
                  checked={isRemember}
                  onChange={() => setIsRemember(!isRemember)}
                />
              }
              label='Remember me'
            />
            <Link href='#'>Forgot password?</Link>
            <Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
              Register Now
            </Button>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}>
              <Typography>{'You have an account? '}</Typography>

              <Link href='/login'>{'Login'}</Link>
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

export default RegisterPage
