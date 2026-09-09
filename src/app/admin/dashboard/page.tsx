"use client"

import AdminDashboard from '@/components/AdminDashboard'
import WriterDashboard from '@/components/WriterDashboard'
import { useAuthStore } from '@/store/useAuthStore'
import { useSyncExternalStore } from 'react';




const Dashboard = () => {
  const {role, accessToken} = useAuthStore()
   function useIsClinet() {
      return useSyncExternalStore(
        () => () => {},
        () => true,
        () => false,
      );
    }
  
    const isClient = useIsClinet();
    if (!isClient) return null;
  return accessToken && role === "admin" ? <AdminDashboard /> : <WriterDashboard />
}

export default Dashboard