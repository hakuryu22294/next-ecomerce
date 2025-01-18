//MUI
import { Box, Card, Grid, useTheme } from '@mui/material'

//NEXT
import { NextPage } from 'next'

//** FORM */

//** Component */

//IMAGE

//** Redux */
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from 'src/stores'

//** toast */
import { deleteRoleAction, getRolesAction } from 'src/stores/apps/role/action'
import { useEffect, useState } from 'react'
import { GridColDef, GridSortModel } from '@mui/x-data-grid'
import { useTranslation } from 'react-i18next'

import { PAGE_SIZE_OPTION } from 'src/configs/grid'
import CustomDataGrid from 'src/components/custom-data-grid'
import CustomPagination from 'src/components/custom-pagination'
import GridEdit from 'src/components/grid-edit'
import GridDelete from 'src/components/grid-delete'
import GridCreate from 'src/components/grid-create'
import InputSearch from 'src/components/input-search'
import CreateEditRole from './components/CreateEditRole'
import toast from 'react-hot-toast'
import { resetInitState } from 'src/stores/apps/role'
import Spinner from 'src/components/spinner'
import ConfirmationDialog from 'src/components/confirmation-dialog'
import IconifyIcon from 'src/components/Icon'

type TProps = {}

const RoleListPage: NextPage<TProps> = () => {
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(PAGE_SIZE_OPTION[0])

  const [openCreateEdit, setOpenCreateEdit] = useState({
    open: false,
    id: ''
  })

  const [openDeleteRole, setOpenDeleteRole] = useState({
    open: false,
    id: ''
  })

  const [sortBy, setSortBy] = useState('created asc')
  const [searchBy, setSearchBy] = useState('')

  //** Redux */
  const dispatch: AppDispatch = useDispatch()
  const {
    roles,
    isSuccessCreateEdit,
    isErrorCreateEdit,
    messageCreateEdit,
    isSuccessDelete,
    isErrorDelete,
    messageDelete,
    isLoading
  } = useSelector((state: RootState) => state.role)

  //** Theme */
  const theme = useTheme()

  //** Translation */
  const { t } = useTranslation()

  const handleGetRoles = () => {
    dispatch(getRolesAction({ params: { limit: 10, page: 1, search: searchBy, order: sortBy } }))
  }
  const handleCloseCreateEdit = () => {
    setOpenCreateEdit({ open: false, id: '' })
  }

  const handleCloseConfirmDeleteRole = () => {
    setOpenDeleteRole({ open: false, id: '' })
  }

  const handleDeleteRole = () => {
    dispatch(deleteRoleAction(openDeleteRole.id))
  }

  const handleSort = (sort: GridSortModel) => {
    const sortOption = sort[0]
    setSortBy(`${sortOption.field} ${sortOption.sort}`)
  }

  useEffect(() => {
    handleGetRoles()
  }, [sortBy, searchBy])

  useEffect(() => {
    if (isSuccessCreateEdit) {
      if (openCreateEdit.id) {
        toast.success(t('update_role_success'))
      } else {
        toast.success(t('create_role_success'))
      }
      handleGetRoles()
      handleCloseCreateEdit()
      dispatch(resetInitState())
    } else if (isErrorCreateEdit && messageCreateEdit) {
      toast.error(t(messageCreateEdit))
    }
  }, [isSuccessCreateEdit, isErrorCreateEdit, messageCreateEdit])

  useEffect(() => {
    if (isSuccessDelete) {
      toast.success(t('delete_role_success'))
      handleGetRoles()
      dispatch(resetInitState())
    } else if (isErrorDelete && messageDelete) {
      toast.error(t(messageDelete))
      dispatch(resetInitState())
    }
  }, [isSuccessDelete, isErrorDelete, messageDelete])

  const columns: GridColDef[] = [
    { field: 'name', headerName: t('role_name'), flex: 1 },
    {
      field: 'action',
      headerName: t('action'),
      minWidth: 150,
      sortable: false,
      align: 'center',
      headerAlign: 'center',
      renderCell: params => {
        const { row } = params

        return (
          <Box sx={{ display: 'flex', gap: '8px', justifyContent: 'center', width: '100%' }}>
            {!row.permissions.some((permission: any) => ['ADMIN.GRANTED', 'BASIC.PUBLIC'].includes(permission)) ? (
              <>
                <GridEdit onClick={() => setOpenCreateEdit({ open: true, id: String(row.id) })} />
                <GridDelete onClick={() => setOpenDeleteRole({ open: true, id: String(row.id) })} />
              </>
            ) : (
              <IconifyIcon icon='ic:outline-lock' />
            )}
          </Box>
        )
      }
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
      <ConfirmationDialog
        open={openDeleteRole.open}
        onClose={handleCloseConfirmDeleteRole}
        title={t('title_delete_role')}
        description={t('confirm_delete_role')}
        handleClose={handleCloseConfirmDeleteRole}
        handleConfirm={handleDeleteRole}
      />
      <CreateEditRole open={openCreateEdit.open} onClose={handleCloseCreateEdit} idRole={openCreateEdit.id} />
      {isLoading && <Spinner />}
      <Box
        sx={{
          backgroundColor: theme.palette.background.paper,

          display: 'flex',
          alignItems: 'center',
          padding: '20px',
          height: '100%'
        }}
      >
        <Grid container sx={{ height: '100%', width: '100%' }}>
          <Grid item md={5} xs={12}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Box sx={{ width: '200px' }}>
                <InputSearch value={searchBy} onChange={(value: string) => setSearchBy(value)} />
              </Box>
              <GridCreate onClick={() => setOpenCreateEdit({ open: true, id: '' })} />
            </Box>
            <CustomDataGrid
              rows={roles.data}
              columns={columns}
              disableRowSelectionOnClick
              hideFooter
              sortingMode='server'
              onSortModelChange={(sort: GridSortModel) => {
                handleSort(sort)
              }}
              getRowId={row => row._id}
              autoHeight
              pagination
              slots={{ pagination: PaginationComponent }}
              pageSizeOptions={PAGE_SIZE_OPTION}
              disableColumnFilter
              disableColumnMenu
            />
          </Grid>
          <Grid item md={7} xs={12}>
            List Permission
          </Grid>
        </Grid>
      </Box>
    </>
  )
}

export default RoleListPage
