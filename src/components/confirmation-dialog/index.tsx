import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  styled,
  Typography,
  useTheme
} from '@mui/material'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import IconifyIcon from '../Icon'

type TConfirmationDialog = {
  open: boolean
  title: string
  description: string
  onClose: () => void
  handleConfirm: () => void
  handleClose: () => void
}

const CustomStyledDialog = styled(Dialog)(({ theme }) => ({
  '.MuiPaper-root.MuiPaper-elevation': {
    width: '400px'
  }
}))

const ConfirmationDialog = (props: TConfirmationDialog) => {
  const { open, onClose, title, description, handleClose, handleConfirm } = props

  const { t } = useTranslation()

  const theme = useTheme()

  return (
    <CustomStyledDialog
      open={open}
      onClose={onClose}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
    >
      <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', padding: '10px 24px', marginTop: '20px' }}>
        <IconifyIcon icon='si:warning-line' fontSize={100} color={theme.palette.warning.main} />
      </Box>
      <DialogTitle sx={{ textAlign: 'center' }} id='alert-dialog-title'>
        <Typography sx={{ fontWeight: 'bold' }} variant='h4'>
          {title}
        </Typography>
      </DialogTitle>
      <DialogContent>
        <DialogContentText sx={{ textAlign: 'center', marginBottom: '20px' }} id='alert-dialog-description'>
          {description}
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ justifyContent: 'center' }}>
        <Button onClick={handleConfirm} variant='contained'>
          {t('Confirm')}
        </Button>
        <Button onClick={handleClose} color='error' variant='outlined' autoFocus>
          {t('Cancel')}
        </Button>
      </DialogActions>
    </CustomStyledDialog>
  )
}

export default ConfirmationDialog
