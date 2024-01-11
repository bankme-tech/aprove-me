import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Providers from './_components/providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Bankme',
  description: 'Teste para aplicação na vaga de desenvolvedor na Bankme',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
		<Providers>
			{children}
		</Providers>
	  </body>
    </html>
  )
}
