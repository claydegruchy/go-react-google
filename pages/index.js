import Head from 'next/head'
import Image from 'next/image'
import Auth from '../components/auth'

import styles from '../styles/Home.module.css'
import 'bootstrap/dist/css/bootstrap.css'
import Script from 'next/script'


export default function Home() {
  return (
  <div className="main">
      <Head>
      </Head>
      
      <h2>Google Tag Manager Editor</h2>
    
      <p>Authenticate into your account and publish new things.</p>
      <Auth />
      
   </div>
  )
}

