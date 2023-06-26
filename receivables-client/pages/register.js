import Head from 'next/head'

import RegisterUser from '../components/RegisterUser'


export default function Register() {
    return (
        <div>
            <Head>
                <title>Aprova-me</title>
                <link rel="icon" href="/assets/logo-bankme.png" />
            </Head>
            <RegisterUser />
        </div>
    )
}
