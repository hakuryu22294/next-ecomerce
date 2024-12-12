//MUI
import { Avatar, Box, Button, Grid, useTheme } from '@mui/material'

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
import { useEffect, useState } from 'react'

//IMAGE
import { useTranslation } from 'react-i18next'
import WrapperFileUpload from 'src/components/wrapper-file-upload'
import { useAuth } from 'src/hooks/useAuth'

// import loginLight from 'public/images/login-light.png'

type TProps = {}

type TDefautlValues = {
  email: string
  address: string
  phoneNumber: string
  fullName: string
  role: string
  city?: string
}

const MyProfilePage: NextPage<TProps> = () => {
  const { user } = useAuth()
  const { t } = useTranslation()

  const theme = useTheme()

  const schema = yup.object().shape({
    email: yup.string().required('Email is required').matches(EMAIL_REG, 'Invalid email'),
    fullName: yup.string().required('Full name is required'),
    address: yup.string().required('Address is required'),
    phoneNumber: yup.string().required('Phone number is required'),
    role: yup.string().required('Role is required'),
    city: yup.string()
  })

  const defaultValues: TDefautlValues = {
    email: '',
    city: '',
    address: '',
    phoneNumber: '',
    role: '',
    fullName: ''
  }

  const {
    handleSubmit,
    formState: { errors },
    control,
    reset
  } = useForm({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(schema)
  })

  const onSubmit = (data: any) => {
    console.log(data)
  }

  const handleUploadAvatar = (file: File) => {
    console.log(file)
  }

  useEffect(() => {
    if (user) {
      console.log(user)
      reset({
        email: user.email,
        city: user.city,
        address: user.address,
        phoneNumber: user.phoneNumber,
        role: user.role.name,
        fullName: user.fullName
      })
    }
  }, [])

  return (
    <form onSubmit={handleSubmit(onSubmit)} autoComplete='off'>
      <Grid container>
        <Grid
          container
          item
          md={6}
          xs={12}
          sx={{ backgroundColor: theme.palette.background.paper, borderRadius: '15px', py: 5, px: 4 }}
        >
          <Box sx={{ height: '100%', width: '100%' }}>
            <Grid container spacing={4}>
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
                  <WrapperFileUpload uploadFunc={handleUploadAvatar}>
                    <Button variant='outlined' sx={{ width: 'auto', display: 'flex', alignItems: 'center', gap: 2 }}>
                      {t('Change_avatar')}
                    </Button>
                  </WrapperFileUpload>
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
                      autoFocus
                      fullWidth
                      label='Email'
                      onChange={onChange}
                      onBlur={onBlur}
                      value={value}
                      placeholder={t('enter_your_email')}
                      error={Boolean(errors.email)}
                      helperText={errors.email?.message}
                    />
                  )}
                  name='email'
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
                      disabled
                      required
                      autoFocus
                      fullWidth
                      label={t('Role')}
                      onChange={onChange}
                      onBlur={onBlur}
                      value={value}
                      placeholder={t('enter_your_role')}
                      error={Boolean(errors.role)}
                      helperText={errors.role?.message}
                    />
                  )}
                  name='role'
                />
              </Grid>
            </Grid>
          </Box>
        </Grid>
        <Grid item container md={6} xs={12} mt={{ xs: 5, md: 0 }}>
          <Box
            sx={{ backgroundColor: theme.palette.background.paper, borderRadius: '15px', py: 5, px: 4 }}
            marginLeft={{ xs: 0, md: 5 }}
          >
            <Grid container spacing={4}>
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
                      label={t('Full_name')}
                      onChange={onChange}
                      onBlur={onBlur}
                      value={value}
                      placeholder={t('enter_your_full_name')}
                      error={Boolean(errors.fullName)}
                      helperText={errors.fullName?.message}
                    />
                  )}
                  name='fullName'
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
                      label={t('Address')}
                      onChange={onChange}
                      onBlur={onBlur}
                      value={value}
                      placeholder={t('enter_your_address')}
                      error={Boolean(errors.address)}
                      helperText={errors.address?.message}
                    />
                  )}
                  name='address'
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
                      label={t('Phone_number')}
                      onChange={onChange}
                      onBlur={onBlur}
                      value={value}
                      placeholder={t('enter_your_phone_number')}
                      error={Boolean(errors.phoneNumber)}
                      helperText={errors.phoneNumber?.message}
                    />
                  )}
                  name='phoneNumber'
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
                      fullWidth
                      label={t('City')}
                      onChange={onChange}
                      onBlur={onBlur}
                      value={value}
                      placeholder={t('enter_your_city')}
                    />
                  )}
                  name='city'
                />
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
      <Box sx={{ width: '100%', display: 'flex', justifyContent: 'flex-end' }}>
        <Button variant='contained' sx={{ mt: 3, mb: 2, width: 'auto' }}>
          Save Changes
        </Button>
      </Box>
    </form>
  )
}

export default MyProfilePage
