import { TextFieldProps, TextField } from '@mui/material'

const CustomTextField = (props: TextFieldProps) => {
  const { size = 'small', InputLabelProps, ...rests } = props

  return <TextField size={size} variant='filled' InputLabelProps={{ ...InputLabelProps, shrink: true }} {...rests} />
}

export default CustomTextField
