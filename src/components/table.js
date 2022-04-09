import React from 'react'
import { useTable, usePagination } from 'react-table'

const Table = ({
    columns,
    data,
    fetchData,
    loading,
    pageCount: controlledPageCount,
    totalRows
}) => {
    const {
        getTableProps,
        getTableBodyProps,
        allColumns,
        prepareRow,
        page,
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        state: { pageIndex, pageSize },
    } = useTable(
        {
            columns,
            data,
            initialState: { pageIndex: 0 }, 
            manualPagination: true, 
            pageCount: controlledPageCount,
        },
        usePagination
    )

    // Listen for changes in pagination and use the state to fetch our new data
    React.useEffect(() => {
        fetchData({ pageIndex, pageSize })
    }, [fetchData, pageIndex, pageSize])

    return (
        < >
            <div className='container'>
                <table {...getTableProps()} className='styled-table'>
                    <thead>
                        <tr>
                            {allColumns.map(column => (
                                <th {...column.getHeaderProps()} >
                                    {column.render('Header')}

                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody {...getTableBodyProps()}>
                        {page.length > 0 ? page.map((row, i) => {
                            prepareRow(row)
                            return (
                                <tr {...row.getRowProps()}>
                                    {row.cells.map(cell => {
                                        return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                    })}
                                </tr>
                            )
                        }) : !loading ? <tr><td colSpan={columns.length}>{'No Data'}</td></tr> : null}
                    </tbody>
                </table>
            </div>
            <div className='pag-loading'>
                {loading ? (
                    <div>Loading...</div>
                ) : (
                    <div>
                        Showing {page.length} of {totalRows}{' '}
                        results
                    </div>
                )}
            </div>
            <div className="pagination">
                <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
                    {'<<'}
                </button>{' '}
                <button onClick={() => previousPage()} disabled={!canPreviousPage}>
                    {'<'}
                </button>{' '}
                <button onClick={() => nextPage()} disabled={!canNextPage}>
                    {'>'}
                </button>{' '}
                <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
                    {'>>'}
                </button>{' '}
                <span>
                    Page{' '}
                    <strong>
                        {pageIndex + 1} of {pageOptions.length}
                    </strong>{' '}
                </span>
                <span>
                    | Go to page:{' '}
                    <input
                        type="number"
                        defaultValue={pageIndex + 1}
                        onChange={e => {
                            const page = e.target.value ? Number(e.target.value) - 1 : 0
                            gotoPage(page)
                        }}
                        style={{ width: '100px' }}
                    />
                </span>{' '}
                <select
                    value={pageSize}
                    onChange={e => {
                        setPageSize(Number(e.target.value))
                    }}
                >
                    {[10, 20, 30, 40, 50, 100].map(pageSize => (
                        <option key={pageSize} value={pageSize}>
                            Show {pageSize}
                        </option>
                    ))}
                </select>
            </div>
        </>
    )
}

export default Table;