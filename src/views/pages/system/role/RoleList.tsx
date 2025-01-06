//MUI
import { Box, Grid, useTheme } from '@mui/material'

//NEXT
import { NextPage } from 'next'

//** FORM */

//** Component */

//IMAGE

//** Redux */
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from 'src/stores'

//** toast */
import { useRouter } from 'next/router'
import { getRolesAction } from 'src/stores/apps/role/action'
import { useEffect, useState } from 'react'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { useTranslation } from 'react-i18next'

import { PAGE_SIZE_OPTION } from 'src/configs/grid'
import CustomDataGrid from 'src/components/custom-data-grid'
import CustomPagination from 'src/components/custom-panigation'

type TProps = {}

const RoleListPage: NextPage<TProps> = () => {
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(PAGE_SIZE_OPTION)

  //** Redux */
  const dispatch: AppDispatch = useDispatch()
  const { isError, isSuccess, isLoading, roles } = useSelector((state: RootState) => state.role)

  //** Theme */
  const theme = useTheme()

  //** Translation */
  const { t } = useTranslation()

  const handleGetRoles = () => {
    dispatch(getRolesAction({ params: { limit: 3, page: 1, search: '' } }))
  }

  useEffect(() => {
    handleGetRoles()
  }, [])

  const columns: GridColDef[] = [{ field: 'name', headerName: t('role_name'), width: 150 }]

  const PaginationComponent = () => {
    return <></>
  }

  return (
    <>
      {/* {isLoading && <FallbackSpinner />} */}
      <Box
        sx={{
          backgroundColor: theme.palette.background.paper,

          display: 'flex',
          alignItems: 'center',
          padding: '40px'
        }}
      >
        <Grid container>
          <Grid item md={5} xs={12}>
            <CustomDataGrid
              rows={roles.data}
              columns={columns}
              checkboxSelection
              disableRowSelectionOnClick
              getRowId={row => row._id}
              slots={{ pagination: PaginationComponent }}
              pageSizeOptions={PAGE_SIZE_OPTION}
            />
          </Grid>
          <Grid item md={5} xs={12}>
            List Permission
          </Grid>
        </Grid>
      </Box>
    </>
  )
}

export default RoleListPage
