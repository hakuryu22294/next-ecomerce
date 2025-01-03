// ** MUI Imports
import { styled, useTheme } from '@mui/material/styles'
import Box, { BoxProps } from '@mui/material/Box'
import { Modal, ModalProps } from '@mui/material'

// ** Components
import CustomCircularProgress from '../custom-circular-progress'

const CustomModal = styled(Modal)<ModalProps>(({ theme }) => ({
  '&.MuiModal-root': {
    width: '100%',
    height: '100%',
    zIndex: 2000,
    '.MuiModal-backdrop': {
      backgroundColor: `rgba(${theme.palette.customColors.main}, 0.3)`
    }
  }
}))

const Spinner = ({ sx }: { sx?: BoxProps['sx'] }) => {
  // ** Hook
  const theme = useTheme()

  return (
    <CustomModal open={true}>
      <Box
        sx={{
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
          justifyContent: 'center',
          ...sx
        }}
      >
        <CustomCircularProgress />
      </Box>
    </CustomModal>
  )
}

export default Spinner
