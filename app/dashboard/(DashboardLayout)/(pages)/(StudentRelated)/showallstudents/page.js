import React from 'react'

// Import components
import ShowStudents from '@/components/ShowStudents';

export const revalidate = 0

// Fetching students function
async function getAllStudents() {
  const url = `https://fee-management-system.vercel.app/api/getallstudents`
  const students = await fetch(url, {
    next: { revalidate: 0 },
    cache: 'no-store',
    method: 'post',
    headers: {
      "Content-Type": 'application/json',
    }
  })
  const jsonStudents = await students.json()
  return jsonStudents.students
}

// Actuall function
export default async function page() {
  const students = await getAllStudents()
  return (
    <ShowStudents students={students}/>
  )
}
