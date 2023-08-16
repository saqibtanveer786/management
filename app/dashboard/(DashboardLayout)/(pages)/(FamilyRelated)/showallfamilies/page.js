import React from 'react'
import ShowFamilies from '@/components/ShowFamilies';

export const revalidate = 0

async function fetchFamilies() {
  const url = `https://fee-management-system.vercel.app/api/family/getallfamilies`
  const families = await fetch(url,{
    next: { revalidate: 0 },
    cache: 'no-store',
    method: 'post',
    headers: {
      "Content-Type": 'application/json',
    }
  })
  const jsonFamilies = await families.json()
  return jsonFamilies
}

export default async function page() {
  const data = await fetchFamilies()
  const {families} = data
  return (
    <ShowFamilies families={families}/>
  )
}
