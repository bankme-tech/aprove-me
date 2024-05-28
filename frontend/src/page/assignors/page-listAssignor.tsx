import { useEffect, useState } from 'react';
import { Container, HeaderPayable, TablePayables } from '../payables/style'
import { useNavigate } from 'react-router-dom';
import { TAssignors } from '../../types/AssignorsType';
import { GetAllAssignorsApi } from '../../service/assignorsApi';

export const DisplayAssignors = () => {
	const navigate = useNavigate();
	const [assignor, setAssignors] = useState<TAssignors[]>([]);
	
	const getAssignors = async () => {
		const response = await GetAllAssignorsApi();
	
		if (response) {
			const assignor = response.map((p: TAssignors) => {
				return {
					id: p.id,
					document: p.document,
          email: p.email,
          phone: p.phone,
          name: p.name,
				}
			})

			setAssignors(assignor)
		}
	}

	useEffect(() => {
		getAssignors();
	}, [])

	return (
		<Container>
			<HeaderPayable>
				<button onClick={ () => navigate('/assignor/register') }>Registrar cedente</button>
				<h1>Lista de Cedentes</h1>
			</HeaderPayable>
			<div>
				<TablePayables>							
					<thead>
						<tr>
							<th>ID</th>
							<th>Nome</th>
              <th>Documento</th>
							<th>Telefone</th>
              <th>Email</th>
						</tr>
					</thead>
					{assignor.map((p) => (
						<tbody key={p.id}>
							<tr>
                <td>{p.id}</td>
                <td>{p.name}</td>
                <td>{p.document}</td>
                <td>{p.phone}</td>
                <td>{p.email}</td>								
							</tr>
						</tbody>
					))}
				</TablePayables>
			</div>
		</Container>
	)
}