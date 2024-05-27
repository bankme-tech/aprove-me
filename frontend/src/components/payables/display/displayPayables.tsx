import { useEffect, useState } from 'react';
import { Container, TablePayables } from './style'
import { GetAllPayablesApi } from '../../../service/PayableApi';
import { TPayable } from '../../../types/PayableType';

export const DisplayPayables = () => {
	const [payables, setPayables] = useState<TPayable[]>([]);
	
	const getPayables = async () => {
		const response = await GetAllPayablesApi();
	
		if (response) {
			const payable = response.map((p: TPayable) => {
				return {
					id: p.id,
					assignor: p.assignor,
					value: p.value,
					emissionDate: new Date(p.emissionDate).toLocaleDateString('pt-BR')
				}
			})

			setPayables(payable)
		}
	}

	useEffect(() => {
		getPayables();
	}, [])

	return (
		<Container>
			<h1>Display Payables</h1>
			<div>
				<TablePayables>							
					<thead>
						<tr>
							<th>ID</th>
							<th>Valor</th>
							<th>Cedente</th>
							<th>Data Emissão</th>
						</tr>
					</thead>
					{payables.map((p) => (
						<tbody key={p.id}>
							<tr>
								<td>{ p.id }</td>
								<td>{ p.value }</td>
								<td>{ p.assignor }</td>
								<td>{ p.emissionDate }</td>
							</tr>
						</tbody>
					))}
				</TablePayables>
			</div>
		</Container>
	)
}