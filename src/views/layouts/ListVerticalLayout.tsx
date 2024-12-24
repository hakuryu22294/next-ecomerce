//** NEXT */
import {
  Collapse,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  styled,
  ListItemTextProps,
  Tooltip
} from '@mui/material'
import { NextPage } from 'next'
import { Fragment, useEffect, useState } from 'react'

//** COMPONENTS */
import IconifyIcon from 'src/components/Icon'
import { VerticalItems } from 'src/configs/verticalItems'

type Tprops = {
  open: boolean
}

type TListItems = {
  items: any
  level: number
  openItems: {
    [key: string]: boolean
  }
  disabled: boolean
  setOpenItems: React.Dispatch<React.SetStateAction<{ [key: string]: boolean }>>
}

const StyledListItem = styled(ListItemText)<ListItemTextProps>(({ theme }) => ({
  '.MuiTypography-root.MuiTypography-body1.MuiListItemText-primary': {
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    display: 'block',
    width: '100%'
  }
}))

const RecursiveList: NextPage<TListItems> = ({ items, openItems, level, disabled, setOpenItems }) => {
  const handleClick = (title: string) => {
    setOpenItems((prev: any) => {
      return {
        ...prev,
        [title]: !prev[title]
      }
    })
  }

  return (
    <>
      {items.map((item: any) => {
        return (
          <Fragment key={item.title}>
            <ListItemButton
              sx={{
                padding: `8px 10px 8px ${level * (level === 1 ? 28 : 20)}px`
              }}
              key={item.title}
              onClick={() => {
                if (item.childrens && item.childrens.length > 0) {
                  handleClick(item.title)
                }
              }}
            >
              <ListItemIcon>
                <IconifyIcon icon={item.icon} />
              </ListItemIcon>
              {!disabled && (
                <Tooltip title={item.title}>
                  <StyledListItem primary={item.title} />
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
  const [openItems, setOpenItems] = useState({})

  useEffect(() => {
    if (!open) setOpenItems({})
  }, [open])

  return (
    <List
      sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
      component='nav'
      aria-labelledby='nested-list-subheader'
    >
      <RecursiveList
        items={VerticalItems}
        openItems={openItems}
        disabled={!open}
        setOpenItems={setOpenItems}
        level={1}
      />
    </List>
  )
}
export default ListVerticalLayout
