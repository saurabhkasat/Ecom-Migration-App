import * as Types from '../../constants/action-types';

const initialState = {
    rows: [],
    totalRows: 0,
    pageCount: 0,
    loading: true,
    pageNumber: 0,
    pageSize: 0
}

export default (state = initialState, { type, data }) => {
    switch (type) {
        case Types.GET_ORDERS:
            return {
                ...state,
                rows: data.rows,
                totalRows: data.totalRows,
                pageCount: data.pageCount,
                loading: data.loading,
                pageNumber: data.pageNumber,
                pageSize: data.pageSize
            }
        case Types.SHOW_ORDERS_LOADER:
            return {
                ...state,
                loading: data.loading
            }
        default:
            return state;
    }
}