//MUI
import { Checkbox, Typography, useTheme } from '@mui/material'
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid'

//NEXT
import { NextPage } from 'next'
import { Dispatch, SetStateAction, useState } from 'react'

//IMAGE

//** Redux */
import { useDispatch} from 'react-redux'
import { AppDispatch } from 'src/stores'

//** Hook i18 */
import { useTranslation } from 'react-i18next'

//** Config */
import { PAGE_SIZE_OPTION } from 'src/configs/grid'

//** Component */
import CustomDataGrid from 'src/components/custom-data-grid'



//** Toast */
import toast from 'react-hot-toast'
import { LIST_DATA_PERMISSIONS, PERMISSIONS } from 'src/configs/permissions'
import Spinner from 'src/components/spinner'
import { getAllValueOfObject } from 'src/utils'

type TTablePermissions = {
    setPermissionSelected: Dispatch<SetStateAction<string[]>>
    permissionSelected: string[]
}

const TablePermissions = (props: TTablePermissions) => {

  //** Props */
  const {setPermissionSelected, permissionSelected} = props

  //** State */  
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(PAGE_SIZE_OPTION[0])

  const [loading, setLoading] = useState(false)

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

  const getValuePermission = ( value:string, mode:string, parentValue?:string) => {
    try{
        return parentValue ?  PERMISSIONS[parentValue][value][mode] : PERMISSIONS[value][mode]
    }catch(e){
      return ""
    }
     
  }

  const handleOnChangeCheckBox = (value:string) => {
      const isChecked= permissionSelected.includes(value)
      if(isChecked){
        const filtered = permissionSelected.filter(item => item !== value)
        setPermissionSelected(filtered)
      }else{
        setPermissionSelected([...permissionSelected, value])
      }
  }

  const handleIsChecked = (value:string, parentValue?:string) => {
    const allValue = parentValue ? getAllValueOfObject(PERMISSIONS[parentValue][value]): getAllValueOfObject(PERMISSIONS[value])
    const isCheckAll = allValue.every(item => permissionSelected.includes(item))

    return {
      isChecked: isCheckAll,
      allValue
    }
  }

  const handleAllCheckBox = (value:string, parentValue?:string) => {
      const {isChecked: isCheckAll, allValue} = handleIsChecked(value, parentValue)
      console.log("isCheckAll", isCheckAll)
      if(isCheckAll){
          const filtered = permissionSelected.filter(item => !allValue.includes(item))
          setPermissionSelected(filtered)
      }else{
          setPermissionSelected([...new Set([...permissionSelected, ...allValue])])
      }
    }
 
    console.log("permissionSelected", {permissionSelected})

  const columns: GridColDef[] = [
    {
        field:'all', headerName:t('All'), 
        minWidth:100,
        sortable:false,

        renderCell:(params:GridRenderCellParams)=>{
            const {row} = params
            const {isChecked}= handleIsChecked(row?.value, row?.parentValue)

            return<>
                {<Checkbox value={row?.value} checked={isChecked} onChange={e => {
                    if(row.isParent){
                        handleAllCheckBox(e.target.value)
                       
                    }else{
                        handleAllCheckBox(e.target.value, row.parentValue)
                    }
                }}/>}
            </>
        }
    },
    {
        field: 'name', 
        headerName: t('role_name'), 
        flex: 1, 
        minWidth:200,
        sortable:false,
        renderCell:(params:GridRenderCellParams) => {
        const {row} = params

        return <Typography sx={{
            color:row?.isParent ? theme.palette.primary.main : `rgba(${theme.palette.customColors.main}, 0.78s)`,
            paddingLeft: !row?.isParent ? "20px" : 0,
            fontWeight:row?.isParent ? "bold":"normal",
            textTransform:row?.isParent ? "uppercase":"none"
        }}>{t(row?.name)}</Typography>
        } 
    },
    {
        field:'view', headerName:t('View'), 
        minWidth:100,
        sortable:false,

        renderCell:(params:GridRenderCellParams)=>{
            const {row} = params
            const value = getValuePermission( row.value, "VIEW", row.parentValue)

            return<>
                {!row.isHideView && !row.isParent &&  
                <Checkbox value={value} 
                onChange={(e)=>handleOnChangeCheckBox(e.target.value)}
                checked={permissionSelected.includes(value)}/>
                }
            </>
        }
    },
    {
        field:'create', headerName:t('Create'), 
        minWidth:100,
        sortable:false,

        renderCell:(params:GridRenderCellParams)=>{
            const {row} = params
            const value = getValuePermission( row.value, "CREATE", row.parentValue)

            return<>
                {!row.isHideCreate && !row.isParent && <Checkbox value={value} onChange={(e)=>handleOnChangeCheckBox(e.target.value)} checked={permissionSelected.includes(value)}/>}
            </>
        }
    },
    {
        field:'update', headerName:t('Update'), 
        minWidth:120,
        sortable:false,
        renderCell:(params:GridRenderCellParams)=>{
            const {row} = params
            const value = getValuePermission( row.value, "UPDATE", row.parentValue)

            return<>
                {!row.isHideUpdate && !row.isParent && <Checkbox value={value} onChange={(e)=>handleOnChangeCheckBox(e.target.value)} checked={permissionSelected.includes(value)}/>}
            </>
        }
    },
    {
        field:'delete', headerName:t('Delete'), 
        minWidth:100,
        sortable:false,
        renderCell:(params:GridRenderCellParams)=>{
            const {row} = params
            const value = getValuePermission( row.value, "DELETE", row.parentValue)

            return<>
                {!row.isHideDelete && !row.isParent && <Checkbox value={value} onChange={(e)=>handleOnChangeCheckBox(e.target.value)} checked={permissionSelected.includes(value)} />}
            </>
        }
    }
   
  ]

  return (
    <>
        {loading && <Spinner />}  
        <CustomDataGrid
            rows={LIST_DATA_PERMISSIONS}
            columns={columns}
            hideFooter
            disableRowSelectionOnClick
            disableColumnFilter
            disableColumnMenu
            scrollbarSize={1}
            />    
    </>
  )
}

export default TablePermissions
