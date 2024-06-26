import { useEffect } from "react";
import { signUp } from "../../../Redux/features/User/userApi";

import * as Yup from "yup";
import { Formik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import InputField from "../../../Shared/InputField";
const SignUpForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error } = useSelector((state) => state.user);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    if (user.user) {
      // setRedirectToDashboard(true)
      navigate("/dashboard");
    }
  }, [user]);
  return (
    <div className="flex justify-center items-start sm:items-center   overflow-hidden   bg-gray-50 dark:bg-gray-900 ">
      <div className="mb-4 rounded-none sm:rounded-lg shadow mt-16 sm:mt-32 p-8 w-full sm:w-1/2 md:w-1/3 ">
        <h2 className="text-2xl text-center font-medium mb-6">Sign Up</h2>
        <Formik
          enableReinitialize
          initialValues={{
            email: "",
            name: ""
          }}
          validationSchema={Yup.object().shape({
            email: Yup.string().email("Please enter valid email").max(255).required("Email is required"),
            name: Yup.string().min(3).max(50).required("Name is required")
          })}
          onSubmit={async (values) => {
            try {
              dispatch(
                signUp({
                  apiEndpoint: "auth/register",
                  requestData: { email: values.email, name: values.name }
                })
              );
              navigate("/sign-in");
            } catch (err) {
              console.log(err);
              toast.error(err?.data?.data?.message || err.error);
            }
          }}
        >
          {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
            <form noValidate onSubmit={handleSubmit}>
              <div className="mb-4">
                <InputField
                  type="name"
                  name="name"
                  id="name"
                  placeholder="Name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  touched={touched?.["name"]}
                  error={errors?.["name"]}
                  value={values.name}
                />
              </div>
              <div className="mb-6">
                <InputField
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  touched={touched?.["email"]}
                  error={errors?.["email"]}
                  value={values.email}
                />
              </div>

              <div className="flex justify-center flex-col gap-2">
                <button
                  className="bg-primary text-primary border-2 border-gray-900 font-medium rounded-lg text-sm px-5 py-2.5 text-center mx-auto block"
                  type="submit"
                >
                  Sign Up
                </button>
                <p className="text-sm text-gray-700">
                  Already have an account?{" "}
                  <Link className="text-gray-900 font-medium underline hover:underline" to="/sign-in">
                    Log In
                  </Link>
                </p>
              </div>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default SignUpForm;
