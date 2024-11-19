// ** React
import * as React from 'react'

// ** MUI
import Box, { BoxProps } from '@mui/material/Box'

// ** Next
import { NextPage } from 'next'

// ** Layouts
import { styled } from '@mui/material'

// ** Children Props
type TProps = {
  children: React.ReactNode
}

const BlankLayoutWrapper = styled(Box)<BoxProps>(({ theme }) => ({
  heigth: '100vh'
}))

const BlankLayout: NextPage<TProps> = ({ children }) => {
  return (
    <BlankLayoutWrapper>
      <Box
        sx={{
          overflow: 'hidden',
          minHeight: '100vh'
        }}
      >
        {children}
      </Box>
    </BlankLayoutWrapper>
  )
}

export default BlankLayout
