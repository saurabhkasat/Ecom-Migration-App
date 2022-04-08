import React from 'react'
import Table from './table'
import OrdersApi from '../apis/modules/orders'
import { columns } from '../constants/order-columns'

const Orders = (props) => {
  const [data, setData] = React.useState([])
  const [loading, setLoading] = React.useState(false)
  const [pageCount, setPageCount] = React.useState(0)
  const [totalRows, setTotalRows] = React.useState(0)

  const fetchIdRef = React.useRef(0)

  const fetchData = React.useCallback(({ pageSize, pageIndex }) => {
    const fetchId = ++fetchIdRef.current

    setLoading(true)

    setTimeout(async () => {
      if (fetchId === fetchIdRef.current) {
        const result = await OrdersApi.getOrders(pageIndex + 1, pageSize)
        if (result.ok) {
          setData(result.data.rows)
          setPageCount(Math.ceil(result.data.totalRows / pageSize))
          setTotalRows(result.data.totalRows)
          setLoading(false)
        }
        else {
          //We can craete a genetric component to show all errors/messages.
          alert(`Error occured while fetching data`);
        }
      }
    }, 1000)
  }, [])

  return (
    <Table
      columns={columns}
      data={data}
      fetchData={fetchData}
      loading={loading}
      pageCount={pageCount}
      totalRows={totalRows}
      isLoading = {props.isLoading}
    />
  )
}

export default Orders
