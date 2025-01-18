import { alpha, InputBase, styled, useTheme } from '@mui/material'
import IconifyIcon from '../Icon'
import { useTranslation } from 'react-i18next'
import { useEffect, useState } from 'react'
import { useDebounce } from 'src/hooks/useDebounce'

interface TInputSearch {
  value: string
  onChange: (value: string) => void
}

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.common.white,
  '&:hover': {
    backgroundColor: theme.palette.common.white
  },
  marginLeft: '0 !important',
  width: '100%',
  height: '38px',
  border: `1px solid ${theme.palette.customColors.borderColor}`,
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto'
  }
}))

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
}))

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  height: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),

    paddingLeft: `calc(1em + ${theme.spacing(4)})`
  }
}))
const InputSearch = (props: TInputSearch) => {
  const { value, onChange } = props
  const { t } = useTranslation()
  const [search, setSearch] = useState(value)
  const debounceSearch = useDebounce(search, 500)

  const theme = useTheme()

  useEffect(() => {
    onChange(debounceSearch)
  }, [debounceSearch])

  return (
    <Search sx={{ backgroundColor: `${theme.palette.background.paper} !important` }}>
      <SearchIconWrapper>
        <IconifyIcon icon='material-symbols:search-rounded' />
      </SearchIconWrapper>
      <StyledInputBase
        placeholder='Search…'
        inputProps={{ 'aria-label': 'search' }}
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
    </Search>
  )
}

export default InputSearch
