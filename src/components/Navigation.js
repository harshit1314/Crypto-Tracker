// import React from 'react'
// import { NavLink } from 'react-router-dom'

// function Navigation() {
//   return (
//     <nav
//     className='w-[40%] mt-16 flex justify-around align-middle
//     border border-cyan rounded-lg'>

// <NavLink
// to="/"
//   className={({isActive}) => {
//    return `w-full text-base text-center font-nunito m-2.5
//    ${isActive ? 'bg-cyan text-gray-300' : 'bg-gray-200 text-gray-100'} 
//      hover:text-cyan active:bg-cyan active:text-gray-300 
//     border-0 cursor-pointer rounded capitalize font-semibold `}
//   }
// >
//   Crypto
// </NavLink>

//         {/* <NavLink to='/' className= {
//             ({isActive}) => {
//                 return `w-full text-base text-center font-nunito m-2.5 bg-gray-200 text-gray-100 hover:text-cyan active:bg-cyan active:text-gray-300
//                 border-0 cursor-pointer rounded capitalize font-semibold`
//             }
//         }>
//        Crypto
//         </NavLink> */}

//         <NavLink to='/trending' className='w-full text-base text-center font-nunito m-2.5
//         bg-gray-200 text-gray-100 hover:text-cyan active:bg-cyan active:text-gray-300
//         border-0 cursor-pointer rounded capitalize font-semibold'>
//        trending
//         </NavLink>

//         <NavLink to='/saved' className='w-full text-base text-center font-nunito m-2.5
//         bg-gray-200 text-gray-100 hover:text-cyan active:bg-cyan active:text-gray-300
//         border-0 cursor-pointer rounded capitalize font-semibold'>
//        saved
//         </NavLink>
        
//     </nav>
//   )
// }

// export default Navigation

import React from 'react';
import { NavLink } from 'react-router-dom';

function Navigation() {
  return (
    <nav
      className="w-[40%] mt-16 flex justify-around items-center border border-cyan rounded-lg"
    >
      <NavLink
        to="/"
        end
        className={({ isActive }) =>
          `w-full text-base text-center font-nunito m-2.5 
          ${isActive ? 'bg-cyan text-gray-300' : 'bg-gray-200 text-gray-600'} 
          hover:text-cyan active:bg-cyan active:text-gray-300 
          border-0 cursor-pointer rounded capitalize font-semibold`
        }
      >
        Crypto
      </NavLink>

      <NavLink
        to="/trending"
        className={({ isActive }) =>
          `w-full text-base text-center font-nunito m-2.5 
          ${isActive ? 'bg-cyan text-gray-300' : 'bg-gray-200 text-gray-600'} 
          hover:text-cyan active:bg-cyan active:text-gray-300 
          border-0 cursor-pointer rounded capitalize font-semibold`
        }
      >
        Trending
      </NavLink>

      <NavLink
        to="/saved"
        className={({ isActive }) =>
          `w-full text-base text-center font-nunito m-2.5 
          ${isActive ? 'bg-cyan text-gray-300' : 'bg-gray-200 text-gray-600'}
          hover:text-cyan active:bg-cyan active:text-gray-300 
          border-0 cursor-pointer rounded capitalize font-semibold`
        }
      >
        Saved
      </NavLink>
    </nav>
  );
}

export default Navigation;
