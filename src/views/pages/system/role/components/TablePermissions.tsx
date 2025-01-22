//MUI
import { Box, Card, Checkbox, Grid, Typography, useTheme } from '@mui/material'
import { GridColDef, GridRenderCellParams, GridSortModel } from '@mui/x-data-grid'

//NEXT
import { NextPage } from 'next'
import { useEffect, useState } from 'react'

//IMAGE

//** Redux */
import { useDispatch} from 'react-redux'
import { AppDispatch, RootState } from 'src/stores'
import { resetInitState } from 'src/stores/apps/role'
import { deleteRoleAction, getRolesAction } from 'src/stores/apps/role/action'

//** Hook i18 */
import { useTranslation } from 'react-i18next'

//** Config */
import { PAGE_SIZE_OPTION } from 'src/configs/grid'
import { OBJECT_TYPE_ERROR_ROLE } from 'src/configs/role'

//** Component */
import CustomDataGrid from 'src/components/custom-data-grid'
import CustomPagination from 'src/components/custom-pagination'


//** Toast */
import toast from 'react-hot-toast'
import { LIST_DATA_PERMISSIONS } from 'src/configs/permissions'

type TProps = {}

const TablePermissions: NextPage<TProps> = () => {
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(PAGE_SIZE_OPTION[0])

  const [openCreateEdit, setOpenCreateEdit] = useState({
    open: false,
    id: ''
  })

  //** Redux */
  const dispatch: AppDispatch = useDispatch()
  

  //** Theme */
  const theme = useTheme()

  //** Translation */
  const { t } = useTranslation()

  
  
  const columns: GridColDef[] = [
    {
        field: 'name', 
        headerName: t('role_name'), 
        flex: 1, 
        sortable:false,
        renderCell:(params:GridRenderCellParams) => {
        const {row} = params

        return <Typography sx={{
            color:row?.isParent ? theme.palette.primary.main : `rgba(${theme.palette.customColors.main}, 0.78s)`,
            paddingLeft: !row?.isParent ? "20px" : 0,
            fontWeight:row?.isParent ? "bold":"normal"
        }}>{t(row?.name)}</Typography>
        } 
    },
    {
        field:'all', headerName:t('All'), 
        minWidth:100,
        maxWidth:100,
        sortable:false,

        renderCell:(params:GridRenderCellParams)=>{
            const {row} = params

            return<>
                {row.isParent &&  <Checkbox value={row?.view}/>}
            </>
        }
    },
    {
        field:'view', headerName:t('View'), 
        minWidth:100,
        maxWidth:100,
        sortable:false,

        renderCell:(params:GridRenderCellParams)=>{
            const {row} = params

            return<>
                {!row.isHideView && !row.isParent &&  <Checkbox value={row?.view}/>}
            </>
        }
    },
    {
        field:'create', headerName:t('Create'), 
        minWidth:100,
        maxWidth:100,
        sortable:false,

        renderCell:(params:GridRenderCellParams)=>{
            const {row} = params

            return<>
                {!row.isHideCreate && !row.isParent && <Checkbox value={row?.create}/>}
            </>
        }
    },
    {
        field:'update', headerName:t('Update'), 
        minWidth:120,
        maxWidth:120,
        sortable:false,
        renderCell:(params:GridRenderCellParams)=>{
            const {row} = params

            return<>
                {!row.isHideUpdate && !row.isParent && <Checkbox value={row?.update}/>}
            </>
        }
    },
    {
        field:'delete', headerName:t('Delete'), 
        minWidth:100,
        maxWidth:100,
        sortable:false,
        renderCell:(params:GridRenderCellParams)=>{
            const {row} = params

            return<>
                {!row.isHideDelete && !row.isParent && <Checkbox value={row?.delete}/>}
            </>
        }
    }
   
  ]

  const PaginationComponent = () => {
    return (
      <CustomPagination
        page={page}
        pageSize={pageSize}
        pageSizeOption={PAGE_SIZE_OPTION}
        rowLength={5}
        onChangePagination={()=>{}}
      />
    )
  }

  return (
    <CustomDataGrid
        rows={LIST_DATA_PERMISSIONS}
        columns={columns}
        hideFooter
        autoHeight
        pagination
        disableColumnFilter
        disableColumnMenu
    />      
  )
}

export default TablePermissions
