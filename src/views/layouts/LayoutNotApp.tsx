// ** React
import * as React from 'react'

// ** MUI
import CssBaseline from '@mui/material/CssBaseline'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Container from '@mui/material/Container'

// ** Next
import { NextPage } from 'next'

// ** Layouts
import VerticalLayout from './VerticalLayout'
import HorizontalLayout from './HorizontalLayout'
import { useTheme } from '@mui/material'

// ** Children Props
type ChildrenProps = {
  children: React.ReactNode
}

const LayoutNotApp: NextPage<ChildrenProps> = ({ children }) => {
  const [open, setOpen] = React.useState()

  const theme = useTheme()

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <HorizontalLayout open={false} toggleDrawer={() => {}} isHideMenu={true} />
      <Box
        component='main'
        sx={{
          backgroundColor: theme =>
            theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[900],
          flexGrow: 1,
          height: '100vh',
          overflow: 'auto'
        }}
      >
        <Toolbar />
        <Container
          maxWidth='lg'
          sx={{
            m: 4,
            width: 'calc(100vw - 32px)',
            maxWidth: 'unset !important',
            overflow: 'auto',
            maxHeight: `calc(${theme.mixins.toolbar.minHeight} - 32px)`,
            p: 0
          }}
        >
          {children}
        </Container>
      </Box>
    </Box>
  )
}

export default LayoutNotApp
