'use client'
import { ProtectedComponent } from '@/app/components/ProtectedComponent'
import React from 'react'

const page = () => {
  return (
    <ProtectedComponent requiredRole='ADMIN'>
     <h1> DASHBOARD ADMIN</h1>
    </ProtectedComponent>
  )
}

export default page
