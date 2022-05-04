import { useRouter } from 'next/router'
import 'bootstrap/dist/css/bootstrap.css'

import NavBar from '../../../components/navbar'
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

export async function getAccountContainers (uid, aid) {
    let res = await fetch('http://localhost:4000/v1/accounts/'+uid+'/'+aid+'/containers')
    res = await res.json()
    return res
  }

const Container = () => {
  const { data: session, status } = useSession()
  const [data, setData] = useState(null)
  const [isLoading, setLoading] = useState(false)
  const router = useRouter()

  const { cid } = router.query

    useEffect( () => {
        if(router.isReady && status === "authenticated") {
        async function getContainers(){
            console.log("Router is " + router.asPath)
            const session = await getSession()
            setLoading(true)
            
            let myuid = await getUserId(session.user.email)
            var data = await getAccountContainers(myuid, router.query.accountid)
                setData({
                    containers: data.containers,
                    user_id: session.user.email,                })
                setLoading(false)
                }
            
                getContainers()
            }
    },[router.isReady])
// TODO: Add validation for user ID
  if (status === "authenticated") {
    if (isLoading) return <p>Loading...</p>
    if (!data) return <p>No profile data</p>
      console.log(data)
    return (
      <div>
        <NavBar />
        <div className="container">

        <h1>Your Containers for Account: {router.query.accountid}</h1>
        <ul>
                    {data.containers.length > 0 ? data.containers.map((container) => 
                    <li key={container.container_id}>
                        <Link href={`/account/${encodeURIComponent(router.query.accountid)}/container/${encodeURIComponent(container.container_id)}`}>
                        <a>{ container.container_name} </a>
                        </Link>
                        
                    </li>) : "No accounts"}
                </ul>
        </div>
      </div>
    )
  }
}

export default Container
