import type { NextPage } from 'next'
import Head from 'next/head'
import { IoAppsSharp } from "react-icons/io5";
import Image from 'next/image'
import { useState } from 'react'
import styles from '../styles/Home.module.css'
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import Script from 'next/script';
import { useRouter } from 'next/router';
import Link from 'next/link';

const Route: NextPage = ( { config } ) => {
  if (global.window) {
    
  }
  
  const Router = useRouter();

  return (
    <>
      <Script>
        {`
          location.href = "${config.config[config.proxy].prefix+Router.query.query}"
        `}
      </Script>
    </>
  )
}

Route.getInitialProps = ({ req }) => {
  return {}
}

export default Route;