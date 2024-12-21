// ** NEXT
import React from 'react'
import Image from 'next/image'

// ** MUI
import {
  Avatar,
  Badge,
  Box,
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Tooltip,
  Typography
} from '@mui/material'
import { useAuth } from 'src/hooks/useAuth'
import IconifyIcon from '../../../../components/Icon'
import { useTranslation } from 'react-i18next'
import { useRouter } from 'next/router'
import { ROUTE_CONFIG } from 'src/configs/route'
import { toFullName } from 'src/utils'
import { styled } from '@mui/material/styles'

type TProps = {}

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: '#44b700',
    color: '#44b700',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: 'ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""'
    }
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0
    }
  }
}))
const UserDropDown = (props: TProps) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)

  // ** Router
  const router = useRouter()

  // ** Auth Hook,
  const { user, logout } = useAuth()

  // ** Translation Hook
  const { t, i18n } = useTranslation()

  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleNavigateMyProfile = () => {
    handleClose()
    router.push(`${ROUTE_CONFIG.MY_PROFILE}`)
  }

  const handleLogout = () => {
    logout()
    handleClose()
  }

  return (
    <React.Fragment>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <Tooltip title='Account settings'>
          <IconButton
            onClick={handleClick}
            size='small'
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup='true'
            aria-expanded={open ? 'true' : undefined}
          >
            <StyledBadge overlap='circular' anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} variant='dot'>
              <Avatar sx={{ width: 32, height: 32 }}>
                {user?.avatar ? (
                  <Image src={user.avatar} alt='avatar' width={32} height={32} />
                ) : (
                  <IconifyIcon icon='ic:round-account-circle' />
                )}
              </Avatar>
            </StyledBadge>
          </IconButton>
        </Tooltip>
      </Box>
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
        <Box sx={{ mx: 4, py: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
          <Avatar sx={{ width: 40, height: 40 }}>
            {user?.avatar ? (
              <Image
                src={user.avatar}
                alt='avatar'
                width={0}
                height={0}
                style={{
                  width: 32,
                  height: 32,
                  objectFit: 'cover'
                }}
              />
            ) : (
              <IconifyIcon icon='ic:round-account-circle' />
            )}
          </Avatar>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Typography>
              {toFullName(
                user?.firstName || '',
                user?.middleName || '',
                user?.lastName || '',
                i18n.language as 'vi' | 'en'
              )}
            </Typography>
            <Typography sx={{ fontWeight: 'bold' }}>{user?.role?.name}</Typography>
          </Box>
        </Box>
        <Divider />
        <MenuItem onClick={handleClose}>{user?.email}</MenuItem>
        <MenuItem onClick={handleNavigateMyProfile}>
          <Avatar /> {t('my_profile')}
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <ListItemIcon></ListItemIcon>
          {t('Logout')}
        </MenuItem>
      </Menu>
    </React.Fragment>
  )
}
export default UserDropDown
