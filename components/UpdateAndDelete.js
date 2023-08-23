import React, { useState } from 'react'

// Import server actions
import { deleteItem } from '@/serveractions/serverAction';

// Importing Icons
import {IconEdit } from '@tabler/icons-react';
import {IconTrashX } from '@tabler/icons-react';

// Importing components
import Loader from './Loader';

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
