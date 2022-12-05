import Head from 'next/head'
import Image from 'next/image'
import { Flex } from '@chakra-ui/react'
import Navbar from '../components/Layout/Navbar'
import Main from '../components/Layout/Main'

export default function Home() {
  return (
    <Flex direction="column" flex="1">
      <Head>
        <title>CasaOS App Builder</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <Main />
    </Flex>
  )
}
