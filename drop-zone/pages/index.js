import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Dropzone from './components/Dropzone'

export default function Home() {
  return (
    <div>
      <Dropzone/>
    </div>
  )
}
