//MUI
import {
  Box,
  Button,
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

const RoleListPage: NextPage<TProps> = () => {
  //** Router */
  const router = useRouter()

  //** Redux */
  const dispatch: AppDispatch = useDispatch()
  const { isLoading, isError, isSuccess, message, typeError } = useSelector((state: RootState) => state.auth)

  //** Theme */
  const theme = useTheme()

  return (
    <>
      {/* {isLoading && <FallbackSpinner />} */}
      <Box
        sx={{
          backgroundColor: theme.palette.background.paper,

          display: 'flex',
          alignItems: 'center',
          padding: '40px'
        }}
      >
        <Grid container>
          <Grid item md={5} xs={12}></Grid>
          <Grid item md={5} xs={12}>
            List Permission
          </Grid>
        </Grid>
      </Box>
    </>
  )
}

export default RoleListPage
