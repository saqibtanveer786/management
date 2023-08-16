import React, { useState } from 'react'

// Importing Icons
import {IconEdit } from '@tabler/icons-react';
import {IconTrashX } from '@tabler/icons-react';

// Importing components
import Loader from './Loader';

async function deleteItem(url) {
  const deleteItem = await fetch(url, {
    method: 'delete',
    headers: {
      'Content-Type': 'application/json',
      "Access-Control-Allow-Origin": "*" ,
    }
  })
  const jsonResponse = await deleteItem.json()
  return true
}

export default function UpdateAndDeleteIcons({id, url, data, setData, setIsLoading}) {
  return (
    <>
      <div className='absolute -top-2 left-0 flex gap-1'>
        <IconEdit size={15} cursor={'pointer'}/>
        <IconTrashX size={15} cursor={'pointer'} onClick={async(e)=>{
          e.preventDefault()
          setIsLoading(true)
          const wait = await deleteItem(url)
          setIsLoading(false)
          if (wait) {
          setData(data.filter((item)=>{
            return item.Id !== id && item.Fcode !== id
          }))
          }
        }
        }
          />
      </div>
    </>
  )
}
