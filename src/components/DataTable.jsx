import React from "react";
import { useTable, usePagination, useSortBy } from "react-table";

const DataTable = ({ columns, data, pageNumber, setPageNumber, limit, pageCount }) => {
  let {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    prepareRow,
    state: { pageIndex },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: pageNumber, pageSize: limit }, // Start from first page
      manualPagination: true, // Disable automatic pagination handling by react-table
      pageCount:pageCount,
    },
    useSortBy,
    usePagination
  );
  // console.log({ pageIndex, pageNumber, canNextPage, pageCount });

  const handleNextPage = () => {
    if (pageNumber < pageCount) {
      setPageNumber(pageIndex + 1);
    }
  };

  const handlePreviousPage = () => {
    if (pageNumber > 0) {
      setPageNumber(pageIndex - 1);
    }
  };
  return (
    <div className="w-full flex justify-center">
      <div className="w-4/5">
        <div className="overflow-x-auto">
          <table
            {...getTableProps()}
            className="w-full table-auto border-collapse"
          >
            <thead>
              {headerGroups.map((headerGroup) => (
                <tr
                  {...headerGroup.getHeaderGroupProps()}
                  className="bg-gray-200"
                >
                  {headerGroup.headers.map((column) => (
                    <th
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                      className="py-2 px-4 text-left font-semibold"
                    >
                      {column.render("Header")}
                      {column.isSorted
                        ? column.isSortedDesc
                          ? " ↓"
                          : " ↑"
                        : ""}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {page.map((row) => {
                prepareRow(row);
                return (
                  <tr
                    {...row.getRowProps()}
                    className="border-t border-gray-200"
                  >
                    {row.cells.map((cell) => {
                      return (
                        <td {...cell.getCellProps()} className="py-2 px-4">
                          {cell.render("Cell")}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className="mt-4 flex justify-between items-center">
            <button
              // onClick={() => {
              //   setPageNumber(--pageIndex);
              //   previousPage();
              // }}
              onClick={handlePreviousPage}
              disabled={!canPreviousPage  || pageNumber === 0}
              className="py-2 px-4 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold rounded-lg focus:outline-none"
            >
              Previous
            </button>
            <div>
              Page{" "}
              <em>
                {pageNumber + 1} of {pageOptions.length}
              </em>
            </div>
            <button
              // onClick={() => {
              //   setPageNumber(++pageIndex);
              //   nextPage();
              // }}
              onClick={handleNextPage}
              disabled={!canNextPage  || pageNumber === pageCount}
              className="py-2 px-4 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold rounded-lg focus:outline-none"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataTable;
