import * as Types from '../../constants/action-types';
import OrdersApi from '../../apis/modules/orders'

export function getOrders(pn, ps) {
    return async (dispatch, getState) => {
        dispatch({
            type: Types.SHOW_ORDERS_LOADER,
            data: {
                loading: true
            }
        })

        //Reload request after file uplaod
        if (!pn || !ps) {
            const state = getState();
            pn = state.orders.pageNumber;
            ps = state.orders.pageSize;
        }

        const result = await OrdersApi.getOrders(pn, ps);
        let rows, totalRows, pageCount, loading;

        if (result.ok) {
            rows = result.data.rows;
            totalRows = result.data.totalRows;
            pageCount = Math.ceil(result.data.totalRows / ps)
            loading = false;
        }

        await dispatch({
            type: Types.GET_ORDERS,
            data: {
                rows,
                totalRows,
                pageCount,
                loading,
                pageNumber: pn,
                pageSize: ps
            }
        })
    }
}
