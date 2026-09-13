"use client"

import AdminDashboard from '@/components/AdminDashboard'
import WriterDashboard from '@/components/WriterDashboard'
import { useAuthStore } from '@/store/useAuthStore'
import { useState, useSyncExternalStore } from 'react';




const Dashboard = () => {
  const {role, accessToken} = useAuthStore()
   const [page, setPage] = useState<number>(1);
    const [limit, setLimit] = useState<number>(5);
   function useIsClinet() {
      return useSyncExternalStore(
        () => () => {},
        () => true,
        () => false,
      );
    }
  
    const isClient = useIsClinet();
    if (!isClient) return null;
  return accessToken && role === "admin" ? <AdminDashboard page={page} limit={limit} /> : <WriterDashboard page={page} limit={limit}/>
}

export default Dashboard