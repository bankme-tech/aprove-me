import Head from 'next/head'

import LoginUser from '../components/LoginUser'


export default function Login() {
    return (
        <div>
            <Head>
                <title>Aprova-me</title>
                <link rel="icon" href="/assets/logo-bankme.png" />
            </Head>
            <LoginUser />
        </div>
    )
}
