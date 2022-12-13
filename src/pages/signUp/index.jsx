import React from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai';
import OAuth from '../../components/header/OAuth';

import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { db } from '../../../firebase';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';

import { toast } from 'react-toastify';
const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });

  //  destructuring
  const { name, email, password } = formData;

  const navigate = useNavigate();

  const onChangeHandler = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const auth = getAuth();
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      // providerData.displayName
      updateProfile(auth.currentUser, {
        displayName: name,
      });

      const user = userCredential.user;
      // make a copy of the state with the user's data that after we can delete the password (do not save it in database)
      const formDataCopy = { ...formData };
      delete formDataCopy.password;
      // add timestamp (method provided by firebase)
      formDataCopy.timestamp = serverTimestamp();
      // save data in database (1 - name of db, 2 - name of collection)
      await setDoc(doc(db, 'users', user.uid), formDataCopy);
      toast.success('Вы успешно зарегистрировались');
      navigate('/');
    } catch (err) {
      toast.error('Ошибка при регистрации. Попробуйте снова');
    }
  };
  return (
    <section>
      <h1 className="text-3xl font-bold text-center mt-6">Sign In</h1>
      <div className="flex justify-center items-center px-6 py-12 max-w-6xl mx-auto flex-wrap">
        <div className="md:w-[67%] lg:w-[50%] mb-12 md:mb-6">
          <img
            className="w-full rounded-2xl"
            src="https://img.freepik.com/free-vector/access-control-system-abstract-concept_335657-3180.jpg?w=826&t=st=1670428947~exp=1670429547~hmac=3475d6d3842e12b51f8f4105d7fc8acad05a389a68b985651e79dd5263d1767c"
          />
        </div>
        <div className="w-full md:w-[67%] lg:w-[40%] lg:ml-20">
          <form onSubmit={onSubmit}>
            <input
              className="w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out mb-6"
              type="text"
              name="name"
              value={name}
              onChange={onChangeHandler}
              placeholder="Ваше имя"
            />
            <input
              className="w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out mb-6"
              type="email"
              name="email"
              value={email}
              onChange={onChangeHandler}
              placeholder="Ваш email"
            />
            <div className="relative">
              <input
                className="mb-6 w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out"
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={password}
                onChange={onChangeHandler}
                placeholder="Ваш пароль"
              />
              {showPassword ? (
                <AiFillEyeInvisible
                  className="absolute right-3 top-3 text-xl cursor-pointer"
                  onClick={() => setShowPassword((prevState) => !prevState)}
                />
              ) : (
                <AiFillEye
                  className="absolute right-3 top-3 text-xl cursor-pointer"
                  onClick={() => setShowPassword((prevState) => !prevState)}
                />
              )}
            </div>
            <div className="mb-6 flex justify-between items-center whitespace-nowrap text-sm sm:text-lg">
              <p className="">
                Есть аккаунт?
                <Link
                  to="/sign-in"
                  className="text-red-600 hover:text-red-700 transition duration-200 ml-1">
                  Войти
                </Link>
              </p>
              <p>
                <Link
                  to="/reset-password"
                  className="text-blue-600 hover:text-blue-700 transition duration-200">
                  Забыли пароль?
                </Link>
              </p>
            </div>
            <button className="w-full bg-blue-600 text-white px-7 py-3 text-sm font-medium uppercase rounded shadow-md hover:bg-blue-700 transition duration-150 ease-in-out hover:shadow-lg active:bg-blue-800">
              Регистрация
            </button>
            <div className="flex my-4 items-center before:border-t before:flex-1  before:border-gray-300 after:border-t after:flex-1  after:border-gray-300">
              <p className="text-center font-semibold mx-4">или</p>
            </div>
            <OAuth />
          </form>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
