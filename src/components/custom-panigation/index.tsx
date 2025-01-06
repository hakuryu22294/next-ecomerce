import { Box } from '@mui/material'
import React, { forwardRef, Ref } from 'react'
import { useTranslation } from 'react-i18next'

type TProps = {
  page: number
  pageSize: number
  rowLength: number
  pageSizeOption: number[]
  onChangePagination: (page: number, pageSize: number) => void
}

const CustomPagination = forwardRef((props: TProps, ref: Ref<any>) => {
  const { pageSize, page, rowLength, pageSizeOption, onChangePagination } = props

  const { t } = useTranslation()

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}
    >
      <Box>
        <span>{t('showing')}</span>
        <span style={{ fontWeight: 'bold' }}>
          {page === 1 ? page : 1 + pageSize} {'-'}
        </span>
        <span style={{ fontWeight: 'bold' }}>{page * pageSize}</span>
        <span>{t('of')}</span>
        <span style={{ fontWeight: 'bold' }}>{rowLength}</span>
        <span style={{ fontWeight: 'bold' }}>{rowLength}</span>
      </Box>
      <Box sx={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
        <Box sx={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
          <span></span>
        </Box>
      </Box>
    </Box>
  )
})

export default CustomPagination
