import React from 'react'
import ShowFamilies from '@/components/ShowFamilies';

export const revalidate = 0

async function fetchFamilies() {
  const url = `http://localhost:3000/api/family/getallfamilies`
  const families = await fetch(url,{
    cache: 'no-store',
    method: 'post',
    headers: {
      "Content-Type": 'application/json',
      "Access-Control-Allow-Origin": "*" ,
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
