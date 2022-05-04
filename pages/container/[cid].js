import { useRouter } from 'next/router'
import 'bootstrap/dist/css/bootstrap.css'

import NavBar from '../../components/navbar'
import { useSession, getSession, signIn, signOut } from "next-auth/react"
import { useState, useEffect } from "react"
import Router from 'next/router'
import Link from 'next/link'


const Container = () => {
  const { data: session, status } = useSession()
  const [data, setData] = useState(null)
  const [isLoading, setLoading] = useState(false)
  const router = useRouter()
  const { cid } = router.query

// TODO: Add validation for user ID
  if (status === "authenticated") {
    return (
      <div>
        <NavBar />
        <div className="container">
        <p>Container: {cid}</p>
        </div>
      </div>
    )
  }
}

export default Container
