import Head from 'next/head'

import Payable from '../components/Payable'


export default function Home() {
  return (
    <div>
      <Head>
        <title>Aprova-me</title>
        <meta name="description" content="Esse é meu portfólio para Bankme como Desenvolvedor Full Stack." />
        <link rel="icon" href="/assets/logo-bankme.png" />
      </Head>
      <Payable />
    </div>
  )
}
