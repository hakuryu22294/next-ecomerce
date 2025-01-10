import { IconButton, Tooltip } from '@mui/material'
import { useTranslation } from 'react-i18next'
import IconifyIcon from '../Icon'

interface TDelete {
  onClick: () => void
  disabled?: boolean
}

const GridDelete = (props: TDelete) => {
  const { onClick, disabled } = props

  const { t } = useTranslation()

  return (
    <Tooltip title={t('delete')}>
      <IconButton onClick={onClick} disabled={disabled}>
        <IconifyIcon icon='mdi:trash-can-outline' />
      </IconButton>
    </Tooltip>
  )
}

export default GridDelete
