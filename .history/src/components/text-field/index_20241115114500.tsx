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
      position: 'relative', // Thêm position: relative để đảm bảo &::after nằm đúng vị trí
      '&:after': {
        content: '""',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '2px', // Độ dày của dòng underline khi focus
        backgroundColor: theme.palette.primary.main, // Màu sắc underline khi focus
        display: 'none' // Ẩn ở trạng thái bình thường
      },
      '&.Mui-focused:after': {
        display: 'block' // Hiện khi có trạng thái focus
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
