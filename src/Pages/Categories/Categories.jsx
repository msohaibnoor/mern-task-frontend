import React, { useEffect, useState } from "react";

import DataTable from "../../components/DataTable";
import { getCars } from "../../Redux/features/Cars/carApi";
import { useDispatch, useSelector } from "react-redux";
import axios from "../../Redux/interceptor";
import { Link, useNavigate } from "react-router-dom";
import { deleteCategory } from "../../Redux/features/Category/categoryApi";

function Categories() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pageNumber, setPageNumber] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const [limit, setLimit] = useState(5);

  const handleDelete = (id) => {
    dispatch(
      deleteCategory({
        apiEndpoint: `/categories/${id}`,
        fetchCategories
      })
    );
  };
  const handleEdit = (category) => {
    navigate(`/edit-category/${category._id}`, { state: category });
  };
  const fetchCategories = () => {
    axios
      .get(`/categories?page=${pageNumber + 1}&limit=${limit}`)
      .then((response) => {
        setCars(response.data.categories);
        setPageCount(response.data.pageCount);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  };
  useEffect(() => {
    fetchCategories();
  }, [pageNumber]);

  const columns = React.useMemo(
    () => [
      {
        Header: "Category Name",
        accessor: "name"
      },

      {
        Header: "Actions",
        Cell: ({ row }) => (
          <div className="py-2 px-4 flex">
            <button
              onClick={() => handleEdit(row.original)}
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-2 py-1 rounded mr-2"
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(row.original._id)}
              className="bg-red-500 hover:bg-red-600 text-white font-semibold px-2 py-1 rounded"
            >
              Delete
            </button>
          </div>
        )
      }
    ],
    []
  );
  return (
    <div className="mt-8 flex justify-center items-center flex-col">
      <div className="w-4/5 flex items-center justify-between mb-5">
        <h1 className="text-3xl text-center mr-4">Categories</h1>
        <div>
          <Link
            to="/add-new-category"
            className="bg-green-500 hover:bg-green-600 text-white font-semibold px-4 py-2 rounded"
          >
            Add New Category
          </Link>
        </div>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <DataTable
          columns={columns}
          data={cars}
          pageNumber={pageNumber}
          setPageNumber={setPageNumber}
          limit={limit}
          pageCount={pageCount}
        />
      )}
    </div>
  );
}

export default Categories;
