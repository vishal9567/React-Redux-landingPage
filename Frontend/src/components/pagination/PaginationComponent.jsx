import { Pagination } from '@mui/material'
import React from 'react'

function PaginationComponent({ totalCount, onPagination }) {
  return (
    <div style={{ paddingTop: '20px', paddingBottom: '20px' }}>
      <Pagination count={totalCount} color='secondary' onChange={onPagination} />
    </div>
  )
}

export default PaginationComponent
