import { InputLabel, InputLabelProps } from '@mui/material'
import { MenuItem, Select, SelectProps, MenuItemProps, styled, Box } from '@mui/material'
import { useTranslation } from 'react-i18next'

type TCustomSelect = SelectProps & {
  options: {
    label: string
    value: string
  }[]
}
const StyledSelect = styled(Select)<SelectProps>(({ theme }) => ({
  '& .MuiSelect-select.MuiSelect-outlined.MuiInputBase-input.MuiOutlinedInput-input': {
    padding: '8px 8px 8px 12px !important',
    boxSizing: 'border-box',
    height: '38px'
  },
  legend: {
    display: 'none'
  },
  '.MuiOutlinedInput-notchedOutline': {
    top: '-2px !important',
    bottom: '2px !important'
  },
  '.MuiSvgIcon-root.MuiSvgIcon-fontSizeMedium.MuiSelect-icon.MuiSelect-iconOutlined': {
    bottom: 'calc(50% - .6em) !important'
  }
}))

const StyledMenuItem = styled(MenuItem)<MenuItemProps>(({ theme }) => ({}))

const CustomPlaceHolder = styled(InputLabel)<InputLabelProps>(({ theme }) => ({
  position: 'absolute',
  top: '8px',
  left: 10,
  zIndex: 5
}))

const CustomSelect = (props: TCustomSelect) => {
  const { value, label, onChange, options, fullWidth, placeholder, ...rest } = props
  const { t } = useTranslation()
 

  console.log('value', value)
  

  return (
    <Box sx={{ width: '100%', height: '100%', position: 'relative' }}>
      {((Array.isArray(value) && !value.length) || !value) && <CustomPlaceHolder>{placeholder}</CustomPlaceHolder>}
      <StyledSelect
        required
        fullWidth={fullWidth}
        labelId='demo-simple-select-label'
        id='demo-simple-select'
        value={value}
        label={label}
        onChange={onChange}
        {...rest}
      >
        {options.length > 0 ? (
          options.map((opt: any) => (
            <StyledMenuItem key={opt.value} value={opt.value}>
              {opt.label}
            </StyledMenuItem>
          ))
        ) : (
          <StyledMenuItem key={0} value={0}>
            {t('No_data')}
          </StyledMenuItem>
        )}
      </StyledSelect>
    </Box>
  )
}

export default CustomSelect
