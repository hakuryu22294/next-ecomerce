//MUI
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  Container,
  CssBaseline,
  FormControlLabel,
  Grid,
  Link,
  Typography
} from '@mui/material'

//NEXT
import { NextPage } from 'next'

//COMPONENT
import CustomTextField from 'src/components/text-field'

//FORM
import { Controller, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

type TProps = {}

const LoginPage: NextPage<TProps> = () => {
  const schema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().min(6).required()
  })
  const {
    handleSubmit,
    formState: { errors },
    control
  } = useForm({
    defaultValues: {
      email: '',
      password: ''
    },
    mode: 'onBlur',
    resolver: yupResolver(schema)
  })

  const onSubmit = (data: { email: string; password: string }) => {
    console.log(data)
  }

  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}></Avatar>
        <Typography component='h1' variant='h5'>
          Sign in
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
                />
              )}
              name='email'
            />
          </Box>
          {errors.email && <Typography color='error'>This is required.</Typography>}

          <Box>
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
                  type='password'
                  onChange={onChange}
                  onBlur={onBlur}
                  value={value}
                  placeholder='Input your password'
                />
              )}
              name='password'
            />
          </Box>

          <FormControlLabel control={<Checkbox value='remember' color='primary' />} label='Remember me' />
          <Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href='#' variant='body2'>
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href='#' variant='body2'>
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Container>
  )
}

export default LoginPage
