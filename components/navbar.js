import Link from 'next/link'
import { signOut } from "next-auth/react"

export default function NavBar(){
    return(
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
  <div className="container-fluid">
          <Link href="/">
                <a className="navbar-brand" >Google Tag Manager Playground</a>
            </Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
            <Link href="/">
                <a  className="nav-link active" aria-current="page">Accounts</a>
            </Link>
        </li>

      </ul>
      <button  type="button" className="btn btn-dark" onClick={() => signOut()}>Sign out</button>
      
    </div>
  </div>
</nav>
    )
}