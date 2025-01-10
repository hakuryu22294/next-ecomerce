//MUI
import { Box, Grid, IconButton, Tooltip, useTheme } from '@mui/material'

//NEXT
import { NextPage } from 'next'

//** FORM */

//** Component */

//IMAGE

//** Redux */
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from 'src/stores'

//** toast */
import { getRolesAction } from 'src/stores/apps/role/action'
import { useEffect, useState } from 'react'
import { GridColDef } from '@mui/x-data-grid'
import { useTranslation } from 'react-i18next'

import { PAGE_SIZE_OPTION } from 'src/configs/grid'
import CustomDataGrid from 'src/components/custom-data-grid'
import CustomPagination from 'src/components/custom-pagination'
import GridEdit from 'src/components/grid-edit'
import GridDelete from 'src/components/grid-delete'
import GridCreate from 'src/components/grid-create'
import InputSearch from 'src/components/input-search'
import CreateEditRole from './components/CreateEditRole'

type TProps = {}

const RoleListPage: NextPage<TProps> = () => {
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(PAGE_SIZE_OPTION[0])

  const [openCreateEdit, setOpenCreateEdit] = useState({
    open: false,
    id: ''
  })

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
  const handleCloseCreateEdit = () => {
    setOpenCreateEdit({ open: false, id: '' })
  }

  useEffect(() => {
    handleGetRoles()
  }, [])

  const columns: GridColDef[] = [
    { field: 'name', headerName: t('role_name'), flex: 1 },
    {
      field: 'action',
      headerName: t('action'),
      minWidth: 150,
      sortable: false,
      align: 'left',
      renderCell: () => (
        <Box sx={{ display: 'flex', gap: '8px' }}>
          <GridEdit onClick={() => setOpenCreateEdit({ open: true, id: '' })} />
          <GridDelete onClick={() => setOpenCreateEdit({ open: true, id: '' })} />
        </Box>
      )
    }
  ]

  const PaginationComponent = () => {
    return (
      <CustomPagination
        page={page}
        pageSize={pageSize}
        pageSizeOption={PAGE_SIZE_OPTION}
        rowLength={roles.totalCount}
        onChangePagination={handleGetRoles}
      />
    )
  }

  return (
    <>
      <CreateEditRole open={openCreateEdit.open} onClose={handleCloseCreateEdit} idRole={openCreateEdit.id} />
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
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Box sx={{ width: '200px' }}>
                <InputSearch />
              </Box>
              <GridCreate onClick={() => setOpenCreateEdit({ open: true, id: '' })} />
            </Box>
            <CustomDataGrid
              rows={roles.data}
              columns={columns}
              disableRowSelectionOnClick
              getRowId={row => row._id}
              autoHeight
              pagination
              slots={{ pagination: PaginationComponent }}
              pageSizeOptions={PAGE_SIZE_OPTION}
              disableColumnFilter
              disableColumnMenu
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
