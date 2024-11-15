import { TextFieldProps, TextField, styled } from '@mui/material'

const TextFiealdStyled = styled(TextField)<TextFieldProps>(({ theme }) => ({}))

const CustomTextField = (props: TextFieldProps) => {
  const { size = 'small', InputLabelProps, ...rests } = props

  return <TextField size={size} variant='filled' InputLabelProps={{ ...InputLabelProps, shrink: true }} {...rests} />
}

export default CustomTextField
