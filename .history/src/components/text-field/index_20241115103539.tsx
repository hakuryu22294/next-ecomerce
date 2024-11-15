import { TextFieldProps, TextField, styled } from '@mui/material'

const TextFieldStyled = styled(TextField)<TextFieldProps>(({ theme }) => ({

    return {
        "&.MuiInputLabel-root":{
            transform:'none'
        }
    }
}))

const CustomTextField = (props: TextFieldProps) => {
  const { size = 'small', InputLabelProps, ...rests } = props

  return <TextField size={size} variant='filled' InputLabelProps={{ ...InputLabelProps, shrink: true }} {...rests} />
}

export default CustomTextField
