"use server"

import { revalidatePath, revalidateTag } from "next/cache"

// Function for adding student
export async function addStudent(data) {
  const url = `https://management-delta.vercel.app/api/addstudent`
  const response = await fetch(url, {
    cache: 'no-cache',
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
  })
  console.log(response)
  const jsonResponse = await response.json()
  console.log('resoponse is', jsonResponse)

  if (response.ok) {
    revalidateTag("students")
    console.log("revalidated successfully")
  }
  if (!response.ok) {
  }
  return jsonResponse
}

// Getting Students 
export async function fetchStudents() {
  const url = `https://management-delta.vercel.app/api/getallstudents`
  const response = await fetch(url, {
    cache: 'force-cache',
    next: {
      tags: ["students"]
    },
    method: 'post',
    headers: {
      'content-type': 'application/json',
    }
  })
  if (response.ok) {
    const jsonResponse = await response.json()
    return jsonResponse.students
  }
}

// Getting Student Attendence Data 
export async function getAttendenceData(date) {
  let currentDate = date.toISOString().split('T')[0]
  console.log(currentDate)
  const url = `https://management-delta.vercel.app/api/attendence/getattendence?date=${currentDate}&forchart=yes`
  const response = await fetch(url, {
    cache: 'force-cache',
    next: {
      tags: ["attendence"]
    },
    method: 'Post',
    headers: {
      'content-type': 'application/json',
    }
  })
  if (response.ok) {
    const jsonResponse = await response.json()
    const lengths = {}
    for (const item in jsonResponse) {
      if (jsonResponse.hasOwnProperty(item)) {
        lengths[item] = jsonResponse[item].map(subItem => Array.isArray(subItem) ? subItem.length : 0)
      }
    }

    return lengths
  }
}


// Deleting the student or family 
export async function deleteItem(url) {
  try {
    const response = await fetch(url, {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    const jsonResponse = await response.json()
    if (response.ok) {
      revalidateTag("students")
      console.log("item deleted")
      console.log(jsonResponse)
      return true
    }
    if (!response.ok) return false
  } catch (error) {
    return false
  }
}


// Getting families 
export async function fetchFamilies() {
  const url = `https://management-delta.vercel.app/api/family/getallfamilies`
  const response = await fetch(url, {
    cache: 'force-cache',
    next: {
      tags: ["families"]
    },
    method: 'Post',
    headers: {
      'content-type': 'application/json',
    }
  })
  if (response.ok) {
    const jsonResponse = await response.json()
    return jsonResponse.families
  }
}
