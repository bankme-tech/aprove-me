import { Card, CardContent } from '@/components/ui/card'

export default function Home() {
  return (
	<>
		<h1 className="text-2xl font-bold mb-4">Dashboard</h1>

		<div className="flex gap-4">
			<Card>
				<CardContent className="pt-6">
					<h2 className='text-3xl'>265</h2>

					<h5>cedentes</h5>
				</CardContent>
			</Card>

			<Card>
				<CardContent className="pt-6">
					<h2 className='text-3xl'>265</h2>

					<h5>recebíveis</h5>
				</CardContent>
			</Card>
		</div>
	</>
  )
}
