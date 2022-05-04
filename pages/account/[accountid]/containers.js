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
        // no need to write getContainers then call it, just make the callback for useeffect async like 
        // async ()=>{
            // then use await and write the whole thing in here
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
    // this thing might shit if the status isn't defined 
    // react sometimes gets mad if a component does not return anything (next may be different)
    // usually you'd do it like status !='thing' return <Loading>
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
                        // unless data is changing all the time, i wouldn't suggest putting a loop like this right inside a short if
                        // its not a big deal here, its not a lot of code, but running this on each render is a bit much
                        // better to make some element that holds this value, then conditionally show that element or dont
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
