import { useSession, signIn, signOut } from "next-auth/react"
import 'bootstrap/dist/css/bootstrap.css';
import Router from 'next/router'


export default function Auth() {
    const { data: session } = useSession()
    if (session) {
        Router.push('/dashboard')
      
    }
    return (
      <>
        Not signed in <br />
        <button  type="button" className="btn btn-dark" onClick={() => signIn()}>Sign in</button>
      </>
    )
  }