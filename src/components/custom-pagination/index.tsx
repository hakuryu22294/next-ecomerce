import { Box, MenuItem, Pagination, Select, styled, PaginationProps } from '@mui/material'

import React, { forwardRef, Ref } from 'react'
import { useTranslation } from 'react-i18next'

type TProps = {
  page: number
  pageSize: number
  rowLength: number
  pageSizeOption: number[]
  onChangePagination: (page: number, pageSize: number) => void
}

const StyleCustomGrid = styled(Pagination)<PaginationProps>(({ theme }) => ({
  '& .MuiDataGrid-footerContainer': {
    '.MuiBox-root': {
      flex: 1,
      width: '100% !important'
    }
  }
}))

const CustomPagination = forwardRef((props: TProps, ref: Ref<any>) => {
  const { pageSize, page, rowLength, pageSizeOption, onChangePagination } = props

  const { t } = useTranslation()

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        paddingLeft: '8px',
        paddingRight: '8px'
      }}
    >
      <Box sx={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
        <span>{t('showing')}</span>
        <span style={{ fontWeight: 'bold' }}>{rowLength > 0 ? (page - 1) * pageSize + 1 : 0}</span>
        <span style={{ fontWeight: 'bold' }}>{page * pageSize}</span>
        <span>{t('of')}</span>
        <span style={{ fontWeight: 'bold' }}>{rowLength}</span>
      </Box>
      <Box sx={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
        <Box sx={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
          <span>{t('rows_per_page')}</span>
          <Select
            size='small'
            sx={{
              width: '80px',
              padding: 0,
              '& .MuiSelect-select.MuiSelect-outlined.MuiInputBase-input.MuiOutlinedInput-input': {
                minWidth: 'unset !important',
                padding: '8.5px 12px 8.5px 24px !important'
              }
            }}
            value={pageSize}
            onChange={e => {
              onChangePagination(1, +e.target.value)
            }}
            ref={ref}
          >
            {pageSizeOption.map(item => (
              <MenuItem key={item} value={item}>
                {item}
              </MenuItem>
            ))}
          </Select>
        </Box>
      </Box>
    </Box>
  )
})

export default CustomPagination
