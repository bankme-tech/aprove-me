import Head from 'next/head'

import Assignor from '../components/Assignor'


export default function Home() {
    return (
        <div>
            <Head>
                <title>Aprova-me</title>
                <link rel="icon" href="/assets/logo-bankme.png" />
            </Head>
            <Assignor />
        </div>
    )
}
