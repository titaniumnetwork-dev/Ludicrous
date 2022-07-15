import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useState } from 'react'
import styles from '../styles/Home.module.css'
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import Script from 'next/script'
import { useRouter } from 'next/router'

const Ultraviolet: NextPage = () => {
  return (
    <Script src="/register/dip.js"></Script>
  )
}

export default Ultraviolet;