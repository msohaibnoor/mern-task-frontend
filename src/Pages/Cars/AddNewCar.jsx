import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import {
  addCar,
  updateCar,
  getCar
} from "../../Redux/features/Cars/carApi";
import { useDispatch, useSelector } from "react-redux";
import { clearCategory } from "../../Redux/features/Category/categorySlice";
import { clearCar } from "../../Redux/features/Cars/carSlice";
import axios from "../../Redux/interceptor";

const AddNewCategory = () => {
  const { car } = useSelector((state) => state.cars);

  const navigate = useNavigate();
  const { carId } = useParams();
  const dispatch = useDispatch();
  const [categories, setCategories] = useState([]);

  // Define validation schema using Yup
  const validationSchema = Yup.object().shape({
    category: Yup.string()
      .required('Category is required'),
    make: Yup.string()
      .required('Make is required'),
    model: Yup.string()
      .required('Model is required'),
    color: Yup.string()
      .required('Color is required'),
    registrationNo: Yup.string()
      .required('Registration Number is required'),
  });

  // Initial form values
  const [initialValues, setInitialValues] = useState({
    category: '',
    make: '',
    model: '',
    color: '',
    registrationNo: '',
  });

  // Handle form submission
  const onSubmit = (values, { resetForm }) => {
    // Submit logic here
    dispatch(
      car
        ? updateCar({
            apiEndpoint: `/cars/${carId}`,
            requestData: { ...values },
          })
        : addCar({
            apiEndpoint: "/cars",
            requestData: { ...values },
          })
    );
    resetForm();
    navigate(-1);
  };

  const onCancelClick = () => {
    navigate(-1);
  };
  const fetchCategories = () => {
    axios
      .get("/categories")
      .then((response) => {
        setCategories(response.data.categories);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }
  useEffect(() => {
    fetchCategories()
    if (carId) {
      dispatch(
        getCar({
          apiEndpoint: `/cars/${carId}`,
        })
      );
    }
    
    return () => {
      dispatch(clearCar());
    };
 
  }, [carId]);
  useEffect(() =>{
    if(car){
        setInitialValues({
          category: car.category,
          make: car.make,
          model: car.model,
          color: car.color,
          registrationNo: car.registrationNo,
        });
    }
  },[car])
  console.log(categories);
  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">
        {car ? "Update Car" : "Add New Car"}
      </h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        enableReinitialize
      >
        {({values, errors, touched, setFieldValue }) => (
      <Form>
            <div className="mb-4">
              <label htmlFor="category" className="block text-sm font-semibold mb-1">Category</label>
              <Field
                as="select"
                id="category"
                name="category"
                className={`w-full px-3 py-2 border rounded-md ${errors.category && touched.category ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="Select category"
                onChange={(e) => {
                  setFieldValue('category', e.target.value); // Set category value using setFieldValue
                }}
              >
                <option value="">Select a category</option>
                {categories.map(category => (
                  <option key={category.id} value={category.id}>{category.name}</option>
                ))}
              </Field>
              <ErrorMessage name="category" component="div" className="text-red-500 text-sm mt-1" />
            </div>

            <div className="mb-4">
              <label htmlFor="make" className="block text-sm font-semibold mb-1">Make</label>
              <Field
                value={values.make || car?.make}
                type="text"
                id="make"
                name="make"
                className={`w-full px-3 py-2 border rounded-md ${errors.make && touched.make ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="Enter make"
              />
              <ErrorMessage name="make" component="div" className="text-red-500 text-sm mt-1" />
            </div>

            <div className="mb-4">
              <label htmlFor="model" className="block text-sm font-semibold mb-1">Model</label>
              <Field
                value={values.model || car?.model}
                type="text"
                id="model"
                name="model"
                className={`w-full px-3 py-2 border rounded-md ${errors.model && touched.model ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="Enter model"
              />
              <ErrorMessage name="model" component="div" className="text-red-500 text-sm mt-1" />
            </div>

            <div className="mb-4">
              <label htmlFor="color" className="block text-sm font-semibold mb-1">Color</label>
              <Field
                value={values.color || car?.color}
                type="text"
                id="color"
                name="color"
                className={`w-full px-3 py-2 border rounded-md ${errors.color && touched.color ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="Enter color"
              />
              <ErrorMessage name="color" component="div" className="text-red-500 text-sm mt-1" />
            </div>

            <div className="mb-4">
              <label htmlFor="registrationNo" className="block text-sm font-semibold mb-1">Registration Number</label>
              <Field
                value={values.registrationNo || car?.registrationNo}
                type="text"
                id="registrationNo"
                name="registrationNo"
                className={`w-full px-3 py-2 border rounded-md ${errors.registrationNo && touched.registrationNo ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="Enter registration number"
              />
              <ErrorMessage name="registrationNo" component="div" className="text-red-500 text-sm mt-1" />
            </div>

            <div className="flex justify-between">
              <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg">
                {car ? "Update" : "Add"}
              </button>
              <button type="button" onClick={onCancelClick} className="bg-gray-400 hover:bg-gray-500 text-white font-semibold py-2 px-4 rounded-lg">
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
