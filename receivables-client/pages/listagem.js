import Head from 'next/head'

import Listing from '../components/Listing'


export default function Listagem() {
    return (
        <div>
            <Head>
                <title>Aprova-me</title>
                <link rel="icon" href="/assets/logo-bankme.png" />
            </Head>
            <Listing />
        </div>
    )
}
