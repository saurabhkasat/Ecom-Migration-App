import React, { useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import Table from './table'
import { columns } from '../constants/order-columns'
import { getOrders } from '../actions/order';

const Orders = (props) => {
  const data = useSelector((state) => state.orders);
  const dispatch = useDispatch();
  const fetchIdRef = React.useRef(0)

  const fetchData = React.useCallback(({ pageSize, pageIndex }) => {
    const fetchId = ++fetchIdRef.current
    setTimeout(async () => {
      if (fetchId === fetchIdRef.current) {
        dispatch(getOrders(pageIndex + 1, pageSize));
      }
    }, 1000)
  }, []);

  return (
    <Table
      columns={columns}
      data={data.rows}
      fetchData={fetchData}
      loading={data.loading}
      pageCount={data.pageCount}
      totalRows={data.totalRows}
    />
  )
}

export default Orders
