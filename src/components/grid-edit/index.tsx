import { IconButton, Tooltip } from '@mui/material'
import { useTranslation } from 'react-i18next'
import IconifyIcon from '../Icon'

interface TEdit {
  onClick: () => void
  disabled?: boolean
}

const GridEdit = (props: TEdit) => {
  const { onClick, disabled } = props

  const { t } = useTranslation()

  return (
    <Tooltip title={t('edit')}>
      <IconButton onClick={onClick} disabled={disabled}>
        <IconifyIcon icon='mdi:clipboard-edit-outline' />
      </IconButton>
    </Tooltip>
  )
}

export default GridEdit
