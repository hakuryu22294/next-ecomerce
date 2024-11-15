'use client'
import Head from 'next/head'
import Button from '@mui/material/Button'
import CustomTextField from 'src/components/text-field'

export default function Home() {
  return (
    <>
      <Head>
        <title>Next-Ecomerce</title>
        <meta name='description' content='Generated by create next app' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Button variant='contained'>Hello world updated</Button>
      <CustomTextField className='custom-input' />
    </>
  )
}
