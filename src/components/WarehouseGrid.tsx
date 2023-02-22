import { Button, Stack } from '@mui/material';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import axios, { AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';

import Box from '@mui/material/Box';
import customConfirm from '../utils/customConfirmation';
import download from 'js-file-download';
import { warehouseModel } from '../models/warehouse.models';
import { warehouseUrl } from '../endpoints';

export default function WarehouseGrid() {
  const [warehouses, setWarehouses] = useState<warehouseModel[]>([]);
  
  useEffect(() => {
    loadData()
  }, [])

  const columns: GridColDef[] = [
    { field: 'code', headerName: 'Code', width: 90 },
    { field: 'name', headerName: 'Name', width: 250 },
    { field: 'address', headerName: 'Address', width: 500 },
    { field: 'state', headerName: 'State', width: 200 },
    { field: 'country', headerName: 'Country', width: 200 },
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
    catch (error: any) {
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
    catch (error: any) {
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