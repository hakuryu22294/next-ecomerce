//** NEXT */
import { Collapse, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import { NextPage } from 'next'
import { Fragment, useState } from 'react'

//** COMPONENTS */
import IconifyIcon from 'src/components/Icon'
import { VerticalItems } from 'src/configs/verticalItems'

const RecursiveList = ({ items, level }: { items: any; level: number }) => {
  const [openItems, setOpenItems] = useState<{ [key: string]: boolean }>({})
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
                padding: `8px 10px 8px ${level * 10}px`
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
              <ListItemText primary={item.title} />
              {item.childrens && item.childrens.length > 0 && (
                <>
                  {openItems[item.title] ? (
                    <IconifyIcon icon='ic:round-keyboard-arrow-down' />
                  ) : (
                    <IconifyIcon icon='ic:round-keyboard-arrow-right' />
                  )}
                </>
              )}
            </ListItemButton>
            {item.childrens && item.childrens.length > 0 && (
              <>
                <Collapse in={openItems[item.title]} timeout='auto' unmountOnExit>
                  <RecursiveList items={item.childrens} level={level + 1} />
                </Collapse>
              </>
            )}
          </Fragment>
        )
      })}
    </>
  )
}

type Tprops = {}
const ListVerticalLayout: NextPage<Tprops> = () => {
  return (
    <List
      sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
      component='nav'
      aria-labelledby='nested-list-subheader'
    >
      <RecursiveList items={VerticalItems} level={1} />
    </List>
  )
}
export default ListVerticalLayout
