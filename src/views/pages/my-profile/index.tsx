//MUI
import { Avatar, Box, Button, Grid, Icon, IconButton, useTheme } from '@mui/material'

//NEXT
import { NextPage } from 'next'

//COMPONENT
import CustomTextField from 'src/components/text-field'
import IconifyIcon from 'src/components/Icon'
import WrapperFileUpload from 'src/components/wrapper-file-upload'

//FORM
import { Controller, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { EMAIL_REG, PASSWORD_REG } from 'src/configs/regex'
import { useEffect, useState } from 'react'

//IMAGE
import { useTranslation } from 'react-i18next'
import { useAuth } from 'src/hooks/useAuth'
import { getAuthMe } from 'src/services/auth'
import { convertBase64, separationFullName, toFullName } from 'src/utils'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from 'src/stores'
import toast from 'react-hot-toast'
import { resetInitState } from 'src/stores/apps/auth'
import { updateAuthMeAction } from 'src/stores/apps/auth/action'
import FallbackSpinner from 'src/components/fall-back'
import Spinner from 'src/components/spinner'

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
  //**context
  const { user } = useAuth()

  //** State */
  const [loading, setLoading] = useState(true)
  const [avatar, setAvatar] = useState(user?.avatar || '')
  const [roleId, setRoleId] = useState('')

  //** i18n */
  const { t, i18n } = useTranslation()

  //** Redux */
  const dispatch: AppDispatch = useDispatch()
  const { isLoading, messageUpdateMe, isErrorUpdateMe, isSuccessUpdateMe } = useSelector(
    (state: RootState) => state.auth
  )

  //** Theme */
  const theme = useTheme()

  const schema = yup.object().shape({
    email: yup.string().required('Email is required').matches(EMAIL_REG, 'Invalid email'),
    fullName: yup.string().required('Full name is required'),
    address: yup.string().notRequired(),
    phoneNumber: yup.string().required('Phone number is required'),
    role: yup.string().required('Role is required'),
    city: yup.string().notRequired()
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

  const fetchGetAuthMe = async () => {
    setLoading(true)
    await getAuthMe()
      .then(async res => {
        setLoading(false)
        const data = res.data
        console.log('data', data)
        if (data) {
          setRoleId(data?.role?._id)
          reset({
            email: data.email,
            city: data.city,
            address: data.address,
            phoneNumber: data.phoneNumber,
            role: data.role.name,
            fullName: toFullName(data.firstName, data.middleName, data.lastName, i18n.language as 'vi' | 'en')
          })
        }
      })
      .catch(() => {
        setLoading(false)
      })
  }

  const handleUploadAvatar = async (file: File) => {
    const base64 = await convertBase64(file)
    setAvatar(base64 as string)
  }

  const cancelAvatarUpload = () => {
    setAvatar('')
  }

  const onSubmit = (data: any) => {
    const { firstName, lastName, middleName } = separationFullName(data.fullName, i18n.language as 'vi' | 'en')
    dispatch(
      updateAuthMeAction({
        email: data.email,
        firstName,
        middleName,
        lastName,
        role: roleId,
        phoneNumber: data.phoneNumber,
        address: data.address,
        city: data.city,
        avatar
      })
    )
  }

  useEffect(() => {
    if (messageUpdateMe) {
      if (isSuccessUpdateMe) {
        toast.success(messageUpdateMe)
      } else if (isErrorUpdateMe) {
        toast.error(messageUpdateMe)
      }
      dispatch(resetInitState())
    }
  }, [messageUpdateMe, isSuccessUpdateMe, isErrorUpdateMe])

  useEffect(() => {
    fetchGetAuthMe()
  }, [i18n.language])

  return (
    <>
      {/* <Spinner /> */}
      {loading || (isLoading && <Spinner />)}
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
                    <Box sx={{ position: 'relative' }}>
                      <IconButton
                        sx={{
                          position: 'absolute',
                          bottom: 0,
                          right: -6,
                          zIndex: 2,
                          backgroundColor: theme.palette.background.default
                        }}
                        onClick={cancelAvatarUpload}
                        edge='start'
                        color='inherit'
                        aria-label='open drawer'
                      >
                        <IconifyIcon icon='material-symbols:close' />
                      </IconButton>
                      {avatar ? (
                        <Avatar alt='avatar' src={avatar} sx={{ width: 100, height: 100 }}>
                          <IconifyIcon icon='ph:user-thin' />
                        </Avatar>
                      ) : (
                        <Avatar alt='avatar' sx={{ width: 100, height: 100 }}>
                          <IconifyIcon icon='ph:user-thin' />
                        </Avatar>
                      )}
                    </Box>
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
          <Button type='submit' variant='contained' sx={{ mt: 3, mb: 2, width: 'auto' }}>
            Save Changes
          </Button>
        </Box>
      </form>
    </>
  )
}

export default MyProfilePage
