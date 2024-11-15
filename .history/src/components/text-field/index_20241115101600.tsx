import { TextFieldProps, TextField } from '@mui/material'

const CustomTextField = (props: TextFieldProps) => {
  const { size = 'small', InputLabelProps, ...rests } = props

  return (
    <TextField
      size={size}
      sx={{
        width: '300px'
      }}
      InputLabelProps={{ ...InputLabelProps, shrink: true }}
      {...rests}
    />
  )
}

export default CustomTextField
