import React, { useEffect } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import Axios from '../../config/axios';
import { useAuthStore } from '../../store/auth.store';

const SignIn: React.FC = () => {
  const navigate = useNavigate();
  const { token, logIn, setUser } = useAuthStore() as { token: string, logIn: (token: string) => void, setUser: (user: any) => void };

  useEffect(() => {
    if (token) {
      Axios.interceptors.request.use((config) => {
        config.headers["Authorization"] = `Bearer ${token}`;
        return config;
      })
      navigate('/');
    }
  }, [token]);

  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center bg-white">
      <div className="w-[400px] md:w-2/3 xl:w-2/5 p-10 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <h2 className="mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
          Sign In
        </h2>
        <Formik initialValues={{
          email: '',
          password: '',
          submit: null
        }}
          validationSchema={Yup.object().shape({
            email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
            password: Yup.string().min(6, 'Password must be at least 6 characters').max(255).required('Password is required')
          })}
          onSubmit={async (values, { setSubmitting }) => {
            const data = {
              email: values.email,
              password: values.password
            }
            await axios({
              method: 'post',
              url: `${import.meta.env.VITE_API_URL}/auth/login`,
              data: data,
              headers: { 'Content-Type': 'application/json' }
            })
              .then((res) => {
                if (res.status === 200) {
                  setSubmitting(false);
                  logIn(res.data.token);
                  setUser(res.data.user);
                  toast.success(res.data.message);
                }
              })
              .catch((err) => {
                setSubmitting(false);
                toast.error(err.response.data.message);
              })
          }}
        >
          {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
            <form noValidate onSubmit={handleSubmit}>
              <div className="mb-5">
                <label className="mb-2.5 block font-medium text-black dark:text-white">
                  Email
                </label>
                <div className="relative">
                  <input
                    name='email'
                    type="email"
                    value={values.email}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    className="w-full rounded-lg border border-stroke bg-transparent py-3 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                  {touched.email && errors.email && (
                    <div className='text-warning text-sm mt-2'>{errors.email}</div>
                  )}
                  <span className="absolute right-4 top-4">
                    <svg
                      className="fill-current"
                      width="22"
                      height="22"
                      viewBox="0 0 22 22"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g opacity="0.5">
                        <path
                          d="M19.2516 3.30005H2.75156C1.58281 3.30005 0.585938 4.26255 0.585938 5.46567V16.6032C0.585938 17.7719 1.54844 18.7688 2.75156 18.7688H19.2516C20.4203 18.7688 21.4172 17.8063 21.4172 16.6032V5.4313C21.4172 4.26255 20.4203 3.30005 19.2516 3.30005ZM19.2516 4.84692C19.2859 4.84692 19.3203 4.84692 19.3547 4.84692L11.0016 10.2094L2.64844 4.84692C2.68281 4.84692 2.71719 4.84692 2.75156 4.84692H19.2516ZM19.2516 17.1532H2.75156C2.40781 17.1532 2.13281 16.8782 2.13281 16.5344V6.35942L10.1766 11.5157C10.4172 11.6875 10.6922 11.7563 10.9672 11.7563C11.2422 11.7563 11.5172 11.6875 11.7578 11.5157L19.8016 6.35942V16.5688C19.8703 16.9125 19.5953 17.1532 19.2516 17.1532Z"
                          fill=""
                        />
                      </g>
                    </svg>
                  </span>
                </div>
              </div>

              <div className="mb-6">
                <label className="mb-2.5 block font-medium text-black dark:text-white">
                  Enter your Password
                </label>
                <div className="relative">
                  <input
                    name='password'
                    type="password"
                    value={values.password}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    className="w-full rounded-lg border border-stroke bg-transparent py-3 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                  {touched.password && errors.password && (
                    <div className='text-warning text-sm mt-2'>{errors.password}</div>
                  )}
                  <span className="absolute right-4 top-4">
                    <svg
                      className="fill-current"
                      width="22"
                      height="22"
                      viewBox="0 0 22 22"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g opacity="0.5">
                        <path
                          d="M16.1547 6.80626V5.91251C16.1547 3.16251 14.0922 0.825009 11.4797 0.618759C10.0359 0.481259 8.59219 0.996884 7.52656 1.95938C6.46094 2.92188 5.84219 4.29688 5.84219 5.70626V6.80626C3.84844 7.18438 2.33594 8.93751 2.33594 11.0688V17.2906C2.33594 19.5594 4.19219 21.3813 6.42656 21.3813H15.5016C17.7703 21.3813 19.6266 19.525 19.6266 17.2563V11C19.6609 8.93751 18.1484 7.21876 16.1547 6.80626ZM8.55781 3.09376C9.31406 2.40626 10.3109 2.06251 11.3422 2.16563C13.1641 2.33751 14.6078 3.98751 14.6078 5.91251V6.70313H7.38906V5.67188C7.38906 4.70938 7.80156 3.78126 8.55781 3.09376ZM18.1141 17.2906C18.1141 18.7 16.9453 19.8688 15.5359 19.8688H6.46094C5.05156 19.8688 3.91719 18.7344 3.91719 17.325V11.0688C3.91719 9.52189 5.15469 8.28438 6.70156 8.28438H15.2953C16.8422 8.28438 18.1141 9.52188 18.1141 11V17.2906Z"
                          fill=""
                        />
                        <path
                          d="M10.9977 11.8594C10.5852 11.8594 10.207 12.2031 10.207 12.65V16.2594C10.207 16.6719 10.5508 17.05 10.9977 17.05C11.4102 17.05 11.7883 16.7063 11.7883 16.2594V12.6156C11.7883 12.2031 11.4102 11.8594 10.9977 11.8594Z"
                          fill=""
                        />
                      </g>
                    </svg>
                  </span>
                </div>
              </div>

              <div className="mb-5">
                <input
                  type="submit"
                  value="Sign In"
                  className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90"
                  disabled={isSubmitting}
                />
              </div>
            </form>
          )}
        </Formik>
        <div className="mt-6 text-center">
          <p>
            Don’t have any account?{' '}
            <Link to="/auth/signup" className="text-primary">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
