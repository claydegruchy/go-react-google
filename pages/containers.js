import 'bootstrap/dist/css/bootstrap.css'
import NavBar from '../components/navbar'
import ContainerList from '../components/containerlist'
import { useSession, signIn, signOut } from "next-auth/react"

import Router from 'next/router'

export async function getUserId(email_address) {
    const requestOptions = {
        method: 'POST',
        body: JSON.stringify({
            email: email_address
        })
    }
   let res = await fetch('http://localhost:4000/v1/users/lookup', requestOptions)
   var response = await res.json();
    let user_id = response.users.user_id
    return user_id
  }

  export async function getAccountList (uid) {
    let res = await fetch('http://localhost:4000/v1/accounts/' + uid)
    res = await res.json()
    return res
  }


export default function Containers(){
    const { data: session } = useSession()
    if(session){
        return (
            <div>
                <NavBar />
                <div class="container">
                <h1>Containers</h1>
                </div>
            </div>
        )
    }
    
}