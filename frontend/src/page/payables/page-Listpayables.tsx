import { useEffect, useState } from 'react';
import { Container, EditContainer, HeaderPayable, TablePayables } from './style'
import { DeletePayableApi, GetAllPayablesApi, GetPayableByIdApi, UpdatePayableApi } from '../../service/PayableApi';
import { TPayable } from '../../types/PayableType';
import { useNavigate } from 'react-router-dom';
import { EditPayableForm } from '../../components/forms/payables/Editpayable';

export const DisplayPayables = () => {
	const navigate = useNavigate();
	const [payables, setPayables] = useState<TPayable[]>([]);
	const [count, setCount] = useState(0);
	const [error, setError] = useState([] as string[]);
	const [edit, setEdit] = useState(false);
	const [idToEdit, setidToEdit] = useState('' as string);
	const [saveIdToEdit, setSaveIdToEdit] = useState('' as string);
	const [editValue, setEditValue] = useState(0 as number);
	const [editDate, setEditDate] = useState('' as string);
	const [editAssignor, setEditAssignor] = useState('' as string);

	const getPayables = async () => {
		const response = await GetAllPayablesApi() as TPayable[];
	
		if (Array.isArray(response) && response) {
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
	}, [count])

	const handleDelete = async (id: string) => {
		await DeletePayableApi(id);
		setCount(count + 1)
		getPayables();	
	}

	const handleEdit = async (id: string) => {
		const getPayable = await GetPayableByIdApi(id);
		setSaveIdToEdit(getPayable.id);
		setidToEdit(getPayable.id);
		setEditValue(getPayable.value);
		setEdit(!edit);
	}

	const handleSubmitEdit = async (edited: TPayable) => {
		try {
			if (edited.id) {
				const isEqual = edited.id === saveIdToEdit;
				if (!isEqual) {
					const isId = await GetPayableByIdApi(edited.id);
					if (isId.id) {
						setError(['ID já existe']);
						return;
					}
				}
			}
			const response = await UpdatePayableApi(saveIdToEdit, edited);
			if (response) {
				setCount(count + 1);
				setEdit(!edit);
			}
			console.log(response);
		} catch (error) {
			console.log(error);
		}
	}

	return (
		<Container>
			<HeaderPayable>
				<button onClick={ () => navigate('/payable/register') }>Registrar pagável</button>
				<h1>Lista de Pagáveis</h1>
			</HeaderPayable>
			<div>
				<TablePayables>							
					<thead>
						<tr>
							<th>ID</th>
							<th>Valor</th>
							<th>Data de Emissão</th>
							<th>Config</th>
						</tr>
					</thead>
					{payables.map((p) => (
						<tbody key={p.id}>
							<tr>
								<td>
									<button
										className='details'
										onClick={ () => navigate(`/payable/${p.id}`) }
										data-testid='details'
									>
										🔍
									</button>
									{ p.id }
								</td>
								<td>{ p.value }</td>
								<td>{ p.emissionDate }</td>
								<td>
									<button
										onClick={ () => handleDelete(p.id) }
										className='config delete'
										data-testid='delete'
									>
										Excluir
									</button>
									<button
										onClick={ () => handleEdit(p.id) }
										className='config edit'
										data-testid='edit'
									>
										Editar
									</button>
								</td>
							</tr>
						</tbody>
					))}
				</TablePayables>

				{ 
					edit && 
						<EditContainer>
							<button
								onClick={ () => setEdit(!edit) }
								className='close'
								data-testid='close-modal'
							>
								❌
							</button>
							<EditPayableForm
										id={idToEdit}
										setId={setidToEdit}
										value={editValue}
										setValue={setEditValue}
										emissionDate={editDate}
										setEmissionDate={setEditDate}
										assignor={editAssignor}
										setAssignor={setEditAssignor}
										handleSubmit={handleSubmitEdit}
										setError={ setError }
									/>	
									{ error.map((e) => (
											<p key={e} className='error'>{ e }</p>
										))	
									}
						</EditContainer>				
				}
			</div>
			
		</Container>
	)
}