"use client"

import useIsClinet from '@/components/UseIsClient';
import { useAuthStore } from '@/store/useAuthStore'

 


const Navbar = () => {
  const {user} = useAuthStore()

  const isClient = useIsClinet();
  if (!isClient) return null;
  return (
    <div className='text-white'>
      <h1 className='text-2xl bg-linear-to-r from-pink-700 via-pink-500  to-pink-800  bg-clip-text text-transparent font-bold'>Welcome {user?.name} To Your Dashboard</h1>
    </div>
  )
}

export default Navbar