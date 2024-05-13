import React, { useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import { addCategory, getCategory, updateCategory } from "../../Redux/features/Category/categoryApi";
import { useDispatch, useSelector } from "react-redux";
import { clearCategory } from "../../Redux/features/Category/categorySlice";

const AddNewCategory = () => {
  const { category } = useSelector((state) => state.categories);

  const navigate = useNavigate();
  const { categoryId } = useParams();
  const dispatch = useDispatch();
  // Define validation schema using Yup
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Category name is required")
  });

  // Initial form values
  const initialValues = {
    name: ""
  };

  // Handle form submission
  const onSubmit = (values, { resetForm }) => {
    dispatch(
      category
        ? updateCategory({
            apiEndpoint: `/categories/${categoryId}`,
            requestData: { name: values.name }
          })
        : addCategory({
            apiEndpoint: "/categories",
            requestData: { name: values.name }
          })
    );
    resetForm();
    navigate(-1);
  };

  const onCancelClick = () => {
    navigate(-1);
  };
  useEffect(() => {
    if (categoryId) {
      dispatch(
        getCategory({
          apiEndpoint: `/categories/${categoryId}`
        })
      );
    }
    return () => {
      dispatch(clearCategory());
    };
  }, [categoryId]);
  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">{category ? "Update Category" : "Add New Category"}</h2>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit} enableReinitialize>
        {({ values, errors, touched }) => (
          <Form>
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-semibold mb-1">
                Category Name
              </label>
              <Field
                value={values.name || category?.name}
                type="text"
                id="name"
                name="name"
                className={`w-full px-3 py-2 border rounded-md ${
                  errors.name && touched.name ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter category name"
              />
              <ErrorMessage name="name" component="div" className="text-red-500 text-sm mt-1" />
            </div>

            <div className="flex justify-between">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg"
              >
                {category ? "Update" : "Add"}
              </button>
              <button
                type="button"
                onClick={onCancelClick}
                className="bg-gray-400 hover:bg-gray-500 text-white font-semibold py-2 px-4 rounded-lg"
              >
                Cancel
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddNewCategory;
