import { Button, Stack } from '@mui/material';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import axios, { AxiosResponse, AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import { warehouseUrl } from '../endpoints';
import { warehouseModel } from '../models/warehouse.models';
import download from 'js-file-download';
import customConfirm from '../utils/customConfirmation';

export default function WarehouseGrid() {
  const [warehouses, setWarehouses] = useState<warehouseModel[]>([]);

  useEffect(() => {
    loadData()
  }, [])

  const columns: GridColDef[] = [
    { field: 'code', headerName: 'Code', width: 90 },
    { field: 'name', headerName: 'Name', width: 150 },
    { field: 'address', headerName: 'Address', width: 350 },
    { field: 'state', headerName: 'State', width: 150 },
    { field: 'country', headerName: 'Country', width: 150 },
    { field: 'zip', headerName: 'Zip', width: 100 },
    {
      field: 'id',
      headerName: 'Actions',
      width: 200,
      renderCell: (params: GridRenderCellParams<number>) => (
        <Stack spacing={2} direction="row">
          <Button onClick={() => downloadWarehouse(params.value!)} variant="contained" size="small">
            Donwload
          </Button>
          <Button onClick={() => customConfirm(() => deleteWarehouse(params.value!))} variant="contained" size="small" color="error">
            Delete
          </Button>
        </Stack>
      )
    }
  ];

  function loadData() {
    axios.get(warehouseUrl)
      .then((response: AxiosResponse<warehouseModel[]>) => {
        setWarehouses(response.data);
      })
  }

  function extractFilenameFromContentDisposition(contentDisposition: string): string {
    const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
    const matches = contentDisposition.match(filenameRegex);
  
    if (matches && matches[1]) {
      return matches[1].replace(/['"]/g, '').trim();
    }
  
    return '';
  }

  async function downloadWarehouse(id: number) {
    try {
      await axios.get(`${warehouseUrl}/${id}/download`, { responseType: 'blob' })
        .then(resp => {
          let headerLine = resp.headers['content-disposition'];          
          let filename = extractFilenameFromContentDisposition(headerLine);
          download(resp.data, filename)
        });
    }
    catch (error: any | AxiosError) {
      if (error && error.response) {
        console.error(error.response.data)
      }
    }
  }

  async function deleteWarehouse(id: number) {
    try {
      await axios.delete(`${warehouseUrl}/${id}`);
      loadData();
    }
    catch (error: any | AxiosError) {
      if (error && error.response) {
        console.error(error.response.data)
      }
    }
  }

  return (
    <Box sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={warehouses}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        disableSelectionOnClick
      />
    </Box>
  );
}