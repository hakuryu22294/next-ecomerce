import { IconButton, Tooltip, useTheme } from '@mui/material'
import { useTranslation } from 'react-i18next'
import IconifyIcon from '../Icon'

interface TCreate {
  onClick: () => void
  disabled?: boolean
}

const GridCreate = (props: TCreate) => {
  const { onClick, disabled } = props

  const { t } = useTranslation()
  const theme = useTheme()

  return (
    <Tooltip title={t('create')}>
      <IconButton
        sx={{ backgroundColor: `${theme.palette.primary.main} !important`, color: theme.palette.common.white }}
        onClick={onClick}
        disabled={disabled}
      >
        <IconifyIcon icon='ic:round-add' />
      </IconButton>
    </Tooltip>
  )
}

export default GridCreate
