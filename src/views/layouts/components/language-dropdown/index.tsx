// ** NEXT
import React from 'react'
import Image from 'next/image'

// ** MUI
import { BoxProps, IconButton, Menu, MenuItem, Popover, styled, Typography } from '@mui/material'

// ** Components
import IconifyIcon from '../../../../components/Icon'
import { LANGUAGE_OPTION } from 'src/configs/i18n'
import { Box } from '@mui/material'

// ** Hooks

import { useTranslation } from 'react-i18next'

// **
type TProps = {}

const LanguageDropdown = (props: TProps) => {
  // ** States
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)

  // ** Hooks
  const { i18n } = useTranslation()
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleOnchangeLang = (lang: string) => {
    i18n.changeLanguage(lang)
    handleClose()
  }

  return (
    <>
      <IconButton color='inherit' onClick={handleClick}>
        <IconifyIcon icon='ic:round-language' />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        id='account-menu'
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              mt: 1.5,
              '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1
              },
              '&::before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0
              }
            }
          }
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        {LANGUAGE_OPTION.map(item => {
          return (
            <MenuItem
              key={item.value}
              selected={item.value === i18n.language}
              onClick={() => handleOnchangeLang(item.value)}
            >
              {item.language}
            </MenuItem>
          )
        })}
      </Menu>
    </>
  )
}
export default LanguageDropdown
