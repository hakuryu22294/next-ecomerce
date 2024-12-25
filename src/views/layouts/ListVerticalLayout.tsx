//** NEXT */
import { Box } from '@mui/material'
import {
  Collapse,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  styled,
  ListItemTextProps,
  Tooltip,
  useTheme
} from '@mui/material'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { Fragment, useEffect, useState } from 'react'

//** COMPONENTS */
import IconifyIcon from 'src/components/Icon'
import { VerticalItems } from 'src/configs/verticalItems'
import { hexToRGBA } from 'src/utils/hex-to-rgba'

type Tprops = {
  open: boolean
}

interface TListItemTextProps extends ListItemTextProps {
  active: boolean
}
type TListItems = {
  items: any
  level: number
  openItems: {
    [key: string]: boolean
  }
  disabled: boolean
  setOpenItems: React.Dispatch<React.SetStateAction<{ [key: string]: boolean }>>
  activePath: string | null
  setActivePath: React.Dispatch<React.SetStateAction<string | null>>
}

const StyledListItem = styled(ListItemText)<TListItemTextProps>(({ theme, active }) => ({
  '.MuiTypography-root.MuiTypography-body1.MuiListItemText-primary': {
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    display: 'block',
    width: '100%',
    color: active ? `${theme.palette.primary.main} !important` : `rgba(${theme.palette.customColors.main}, 0.7)`,
    fontWeight: active ? 600 : 500
  }
}))

const RecursiveList: NextPage<TListItems> = ({
  items,
  openItems,
  level,
  disabled,
  setOpenItems,
  activePath,
  setActivePath
}) => {
  //** Theme Hook */
  const theme = useTheme()

  //** Router */
  const router = useRouter()
  const handleClick = (title: string) => {
    setOpenItems((prev: any) => {
      return {
        [title]: !prev[title]
      }
    })
  }

  const handleSelectItem = (path: string) => {
    setActivePath(path)
    if (path) router.push(path)
  }

  return (
    <>
      {items.map((item: any) => {
        return (
          <Fragment key={item.title}>
            <ListItemButton
              sx={{
                padding: `8px 10px 8px ${level * (level === 1 ? 28 : 20)}px`,
                margin: '1px 0',
                display: 'flex',
                gap: '10px',
                backgroundColor:
                  (activePath && activePath === item.path) || !!openItems[item.title]
                    ? `${hexToRGBA(theme.palette.primary.main, 0.08)} !important`
                    : theme.palette.background.paper
              }}
              key={item.title}
              onClick={() => {
                if (item.childrens && item.childrens.length > 0) {
                  handleClick(item.title)
                }
              }}
            >
              <Box
                sx={{
                  backgroundColor:
                    (activePath && activePath === item.path) || openItems[item.title] ? theme.palette.primary.main : '',
                  height: '30px',
                  width: '30px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: '10px',
                  color:
                    (activePath && activePath === item.path) || openItems[item.title]
                      ? theme.palette.customColors.lightPaperBg
                      : `rgba(${theme.palette.customColors.main}, 0.7)`
                }}
              >
                <ListItemIcon
                  sx={{
                    marginRight: 0,
                    color:
                      (activePath && activePath === item.path) || openItems[item.title]
                        ? `${theme.palette.customColors.lightPaperBg} !important`
                        : `rgba(${theme.palette.customColors.main}, 0.7) !important`
                  }}
                >
                  <IconifyIcon icon={item.icon} />
                </ListItemIcon>
              </Box>
              {!disabled && (
                <Tooltip title={item.title}>
                  <StyledListItem
                    primary={item.title}
                    active={(activePath && activePath === item.path) || openItems[item.title]}
                    onClick={() => handleSelectItem(item.path)}
                  />
                </Tooltip>
              )}
              {item.childrens && item.childrens.length > 0 && (
                <>
                  {openItems[item.title] ? (
                    <IconifyIcon icon='ic:twotone-expand-less' style={{ transform: 'rotate(180deg)' }} />
                  ) : (
                    <IconifyIcon icon='ic:twotone-expand-less' />
                  )}
                </>
              )}
            </ListItemButton>
            {item.childrens && item.childrens.length > 0 && (
              <>
                <Collapse in={openItems[item.title]} timeout='auto' unmountOnExit>
                  <RecursiveList
                    items={item.childrens}
                    openItems={openItems}
                    disabled={disabled}
                    setOpenItems={setOpenItems}
                    level={level + 1}
                    activePath={activePath}
                    setActivePath={setActivePath}
                  />
                </Collapse>
              </>
            )}
          </Fragment>
        )
      })}
    </>
  )
}

const ListVerticalLayout: NextPage<Tprops> = ({ open }) => {
  //** STATE */
  const [openItems, setOpenItems] = useState({})
  const [activePath, setActivePath] = useState<null | string>('')

  useEffect(() => {
    if (!open) setOpenItems({})
  }, [open])

  return (
    <List
      sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper', padding: 0 }}
      component='nav'
      aria-labelledby='nested-list-subheader'
    >
      <RecursiveList
        items={VerticalItems}
        openItems={openItems}
        disabled={!open}
        setOpenItems={setOpenItems}
        level={1}
        activePath={activePath}
        setActivePath={setActivePath}
      />
    </List>
  )
}
export default ListVerticalLayout
