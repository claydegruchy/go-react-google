import 'bootstrap/dist/css/bootstrap.css'
import NavBar from '../components/navbar'
import { useSession, getSession, signIn, signOut } from "next-auth/react"
import { useState, useEffect } from "react"
import Router from 'next/router'
import Link from 'next/link'

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

export default function Dashboard(){
    const { data: session, status } = useSession()
    const [data, setData] = useState(null)
    const [isLoading, setLoading] = useState(false)
    
        useEffect( () => {
            if(session){
            async function getAccounts(){
            await getSession()
            setLoading(true)
            
            let myuid = await getUserId(session.user.email)
            var data = await getAccountList(myuid)
                setData({
                    accounts: data.accounts,
                    user_id: session.user.email,                })
                setLoading(false)
                }
            
            getAccounts()
        }
          }, [session])
    
        
          if (status === "authenticated") {
          
          if (isLoading) return <p>Loading...</p>
          if (!data) return <p>No profile data</p>
        return (
            <div>
                <NavBar />
                <div className="container">
                    <h1>Your Accounts ({ data.user_id })</h1>
                    <ul>
                    {data.accounts.length > 0 ? data.accounts.map((account) => 
                    <li key={account.account_id}>
                        
                        <Link href={`/account/${encodeURIComponent(account.account_id)}/containers`}>
                            <a>{account.account_name}</a>
                        </Link>
                    </li>) : "No accounts"}
                </ul>
                
                </div>
            </div>
        )
    }
    
}