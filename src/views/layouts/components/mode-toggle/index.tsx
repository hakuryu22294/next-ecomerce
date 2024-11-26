// ** NEXT
import React from 'react'
import Image from 'next/image'

// ** MUI
import { Avatar, Box, Divider, IconButton, ListItemIcon, Menu, MenuItem, Tooltip } from '@mui/material'

import IconifyIcon from '../../../../components/Icon'
import { useSettings } from 'src/hooks/useSettings'
import { Mode } from 'src/types/layouts'

type TProps = {}
const ModeToggle = (props: TProps) => {
  const { settings, saveSettings } = useSettings()

  const handleModeChange = (mode: Mode) => {
    saveSettings({ ...settings, mode })
  }
  const handleToggle = () => {
    settings.mode === 'light' ? handleModeChange('dark') : handleModeChange('light')
  }

  return (
    <IconButton color='inherit' onClick={handleToggle}>
      <IconifyIcon
        icon={settings.mode === 'light' ? 'material-symbols:dark-mode-outline' : 'material-symbols:light-mode-outline'}
      />
    </IconButton>
  )
}
export default ModeToggle
