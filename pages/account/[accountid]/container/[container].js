import { useRouter } from 'next/router'
import 'bootstrap/dist/css/bootstrap.css'

import NavBar from '../../../../components/navbar'
import { useSession, getSession, signIn, signOut } from "next-auth/react"
import { useState, useEffect } from "react"
import Router from 'next/router'
import Link from 'next/link'

const Container = () => {
    const { data: session, status } = useSession()
    const [data, setData] = useState(null)
    const [isLoading, setLoading] = useState(false)
    const router = useRouter()
  
    return (
        <>
        <NavBar />
        <div className="container">
        <p>Hello</p>
        </div>
        </>
    )
}

export default Container