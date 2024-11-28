//MUI
import {
  Avatar,
  Box,
  Button,
  Card,
  Checkbox,
  FormControlLabel,
  Grid,
  IconButton,
  InputAdornment,
  Typography,
  useTheme
} from '@mui/material'

//NEXT
import { NextPage } from 'next'
import Image from 'next/image'
import Link from 'next/link'

//COMPONENT
import CustomTextField from 'src/components/text-field'

//FORM
import { Controller, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { EMAIL_REG, PASSWORD_REG } from 'src/configs/regex'
import { useState } from 'react'
import IconifyIcon from 'src/components/Icon'

//IMAGE
import registerDark from 'public/images/register-dark.png'

// import loginLight from 'public/images/login-light.png'

type TProps = {}

const MyProfilePage: NextPage<TProps> = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false)

  const [isRemember, setIsRemember] = useState<boolean>(false)

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

  const onSubmit = (data: { email: string; password: string }) => {
    console.log(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} autoComplete='off'>
      <Card
        sx={{
          backgroundColor: theme.palette.background.paper,
          borderRadius: '15px',
          p: 4
        }}
      >
        <Grid container spacing={5}>
          <Grid container item md={6} xs={12} spacing={6}>
            <Grid item md={12} xs={12}>
              <Box
                sx={{
                  display: 'flex',
                  width: '100%',
                  height: '100%',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'column',
                  gap: 2
                }}
              >
                <Avatar sx={{ width: 100, height: 100 }}></Avatar>
                <Button variant='outlined'>Upload</Button>
              </Box>
            </Grid>
            <Grid item md={6} xs={12}>
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
            </Grid>
            <Grid item md={6} xs={12}>
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
            </Grid>
          </Grid>
          <Grid container md={6} xs={12} item spacing={5}>
            <Grid item md={6} xs={12}>
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
            </Grid>
            <Grid item md={6} xs={12}>
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
            </Grid>
            <Grid item md={6} xs={12}>
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
            </Grid>
            <Grid item md={6} xs={12}>
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
            </Grid>
          </Grid>
        </Grid>
      </Card>

      <Box sx={{ width: '100%', display: 'flex', justifyContent: 'flex-end' }}>
        <Button variant='contained' sx={{ mt: 3, mb: 2, width: 'auto' }}>
          Save Changes
        </Button>
      </Box>
    </form>
  )
}

export default MyProfilePage
