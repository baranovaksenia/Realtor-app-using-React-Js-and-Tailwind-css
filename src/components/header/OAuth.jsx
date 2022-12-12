import React from 'react';
import tw from 'tailwind-styled-components';
import { FcGoogle } from 'react-icons/fc';
const OAuth = () => {
  return (
    <Button>
      <FcGoogle className="mr-2 text-xl bg-white rounded-full " />
      Continue with Google
    </Button>
  );
};

export default OAuth;

const Button = tw.div`

flex 
items-center 
justify-center 
w-full 
bg-red-700 
text-white 
px-7 
py-3 
uppercase 
text-sm 
font-medium 
shadow-md 
rounded 

hover:bg-red-800 
hover:shadow-lg 

active:bg-red-900 
active:shadow-lg

transition
duration-150
ease-in-out
    
`;
