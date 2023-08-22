"use server"

import { revalidateTag } from "next/cache"

// Function for adding student
export async function addStudent(data) {
const url = `http://localhost:3000/api/addstudent`
const response = await fetch(url, {
    cache: 'no-cache',
    method: 'post',
    headers: {
    'Content-Type': 'application/json',
    "Access-Control-Allow-Origin": "*" ,
    },
    body: JSON.stringify(data)
})
console.log(response)
const jsonResponse = await response.json()
console.log('resoponse is',jsonResponse)

if(response.ok){
    revalidateTag("allstudents")
}
if(!response.ok){
}
return jsonResponse
}