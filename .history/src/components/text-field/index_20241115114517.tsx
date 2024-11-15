import { TextFieldProps, TextField, styled } from '@mui/material'

const TextFieldStyled = styled(TextField)<TextFieldProps>(({ theme }) => {
  return {
    '& .MuiInputLabel-root': {
      transform: 'none',
      lineHeight: 1.2,
      position: 'relative',
      marginBottom: theme.spacing(1),
      fontSize: theme.typography.body2.fontSize
    },
    '& .MuiInputBase-root': {
      borderRadius: 8,
      backgroundColor: 'transparent !important',
      border: `1px solid rgba(${theme.palette.customColors.main}, 0.2)`,
      transition: theme.transitions.create(['border-color', 'box-shadow'], {
        duration: theme.transitions.duration.shorter
      }),
      overflow: 'hidden',
      position: 'relative',
      '&:after': {
        content: '""',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '2px',
        backgroundColor: theme.palette.primary.main,
        display: 'none'
      },
      '&.Mui-focused:after': {
        display: 'block'
      }
    },

    '.MuiInputBase-input': {
      padding: '8px 12px'
    }
  }
})

const CustomTextField = (props: TextFieldProps) => {
  const { size = 'small', variant = 'filled', InputLabelProps, ...rests } = props

  return <TextFieldStyled size={size} variant={variant} InputLabelProps={{ ...InputLabelProps }} {...rests} />
}

export default CustomTextField
