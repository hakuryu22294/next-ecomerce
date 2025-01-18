import { yupResolver } from '@hookform/resolvers/yup'
import {
  alpha,
  Box,
  Button,
  Divider,
  IconButton,
  InputAdornment,
  InputBase,
  styled,
  Typography,
  useTheme
} from '@mui/material'
import { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import CustomModal from 'src/components/custom-modal'
import IconifyIcon from 'src/components/Icon'
import CustomTextField from 'src/components/text-field'
import { getDetailsRole } from 'src/services/role'
import { AppDispatch } from 'src/stores'
import { createRoleAction, updateRoleAction } from 'src/stores/apps/role/action'
import * as yup from 'yup'

interface TCreateEditRole {
  open: boolean
  onClose: () => void
  idRole?: string
}
const CreateEditRole = (props: TCreateEditRole) => {
  const { open, onClose, idRole } = props
  const { t } = useTranslation()

  const theme = useTheme()

  const dispatch: AppDispatch = useDispatch()

  const schema = yup.object().shape({
    name: yup.string().required(t('Required_field'))
  })

  const defaultValues = {
    name: ''
  }

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset
  } = useForm({
    defaultValues,
    mode: 'onBlur',
    resolver: yupResolver(schema)
  })

  const onSubmit = (data: { name: string }) => {
    if (!Object.keys(errors).length) {
      if (idRole) {
        dispatch(updateRoleAction({ id: idRole, name: data?.name }))
      } else {
        dispatch(createRoleAction({ name: data?.name }))
      }
    }
  }

  // ** Fetch Role info
  const fetchDetailsRole = async (id: string) => {
    const res = await getDetailsRole(id)
    const data = res.data
    if (data) {
      reset({
        name: data?.name
      })
    }
  }

  useEffect(() => {
    if (!open) {
      reset({
        name: ''
      })
    } else if (idRole) {
      console.log(idRole)
      fetchDetailsRole(idRole)
    }
  }, [open, idRole])

  return (
    <CustomModal open={open} handleClose={() => {}}>
      <Box
        sx={{
          backgroundColor: theme.palette.background.paper,
          padding: '20px',
          borderRadius: '15px',
          position: 'relative'
        }}
      >
        <Box>
          <Typography sx={{ fontWeight: '600' }} variant='h4'>
            {idRole ? t('Edit_role') : t('Create_role')}
          </Typography>
          <IconButton onClick={onClose} sx={{ position: 'absolute', top: '6px', right: '6px' }}>
            <IconifyIcon icon='material-symbols:close-rounded' />
          </IconButton>
        </Box>
        <Divider />
        <form onSubmit={handleSubmit(onSubmit)} autoComplete='off' noValidate>
          <Box
            sx={{
              mt: 2,
              width: '300px',
              padding: '20px',
              backgroundColor: theme.palette.customColors.bodyBg,
              borderRadius: '15px'
            }}
            minWidth={{ md: '400px', xs: '80vw' }}
          >
            <Controller
              rules={{
                maxLength: 100
              }}
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <CustomTextField
                  required
                  fullWidth
                  label={t('Role_name')}
                  type='text'
                  onChange={onChange}
                  onBlur={onBlur}
                  value={value}
                  placeholder={t('Input_your_role_name')}
                  error={Boolean(errors?.name)}
                  helperText={errors.name?.message}
                />
              )}
              name='name'
            />
          </Box>
          <Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
            {!idRole ? t('create') : t('edit')}
          </Button>
        </form>
      </Box>
    </CustomModal>
  )
}

export default CreateEditRole
