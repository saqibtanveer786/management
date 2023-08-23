import React from 'react'

// Import components
import ShowStudents from '@/components/ShowStudents';

export const revalidate = 0

// Importing serverActions
import { fetchStudents } from '@/serveractions/serverAction';

// Actuall function
export default async function page() {
  const students = await fetchStudents()
  return (
    <ShowStudents students={students} />
  )
}
