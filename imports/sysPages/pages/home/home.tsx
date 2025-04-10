import React, { useContext } from 'react';
import Typography from '@mui/material/Typography';
import HomeStyles from './homeStyle';
import AuthContext, { IAuthContext } from '/imports/app/authProvider/authContext';
import Box from '@mui/material/Box';
import { SysFab } from '/imports/ui/components/sysFab/sysFab';
import { KeyboardDoubleArrowRightOutlined } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { ToDoListControllerContext } from '/imports/modules/toDos/pages/toDoList/toDoListController';
import { SysTaskCard } from '/imports/modules/toDos/components/SysTaskCard';
import List from '@mui/material/List';
import { IToDo } from '/imports/modules/toDos/api/toDoSch';


const Home: React.FC = () => {
	const { user } = useContext<IAuthContext>(AuthContext);
	const { toDosRecent, loading } = useContext(ToDoListControllerContext);
	const navigate = useNavigate();

	const { Container, Header } = HomeStyles;

	const tasksTemp: IToDo[] = [
		{
			title: 'Finalizar relatório',
			description: 'Completar o relatório mensal e enviar para o gerente.',
			shared: 'Equipe de Vendas',
			date: new Date(),
			done: false,
			picture: '/images/report.png',
			owner: 'Lucas'
		},
		{
			title: 'Reunião com o cliente',
			description: 'Discutir os requisitos do novo projeto com o cliente.',
			shared: 'Equipe de Projetos',
			date: new Date(),
			done: false,
			picture: '/images/meeting.png',
			owner: 'Lucas'
		},
		{
			title: 'Finalizar relatório',
			description: 'Completar o relatório mensal e enviar para o gerente.',
			shared: 'Equipe de Vendas',
			date: new Date(),
			done: false,
			picture: '/images/report.png',
			owner: 'Lucas'
		},
		{
			title: 'Reunião com o cliente',
			description: 'Discutir os requisitos do novo projeto com o cliente.',
			shared: 'Equipe de Projetos',
			date: new Date(),
			done: false,
			picture: '/images/meeting.png',
			owner: 'Lucas'
		},
		{
			title: 'Reunião com o cliente',
			description: 'Discutir os requisitos do novo projeto com o cliente.',
			shared: 'Equipe de Projetos',
			date: new Date(),
			done: false,
			picture: '/images/meeting.png',
			owner: 'Lucas'
		},
		
	];

	return (
		<Container>

			<Box>
				<Typography variant='h1'>Olá, {user?.username}</Typography>
				<Typography variant='body1' sx={{ whiteSpace: 'pre-wrap' }}>{'    |'}</Typography>
				<Typography variant='body1'>Seus projetos muito mais organizados. Veja as tarefas adicionadas por seu time, por você e para você!</Typography>
			</Box>

			<Typography variant='h3'>Adicionadas recentemente</Typography>

			{tasksTemp && tasksTemp.length > 0 ?
				<List sx={{width: '100%'}}>
					{tasksTemp.map((task) => {
						return (
							<SysTaskCard
								task={task} onClick={() => { }} />
						);
					})}
				</List>
				:
				<Box sx={{ height: '50%', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
					<Typography variant="body1">
						Não existem tarefas adicionadas até o momento!
					</Typography>
				</Box>

			}

			<SysFab
				fixed
				text='Ir para tarefas'
				onClick={() => navigate('/todo')}
				endIcon={<KeyboardDoubleArrowRightOutlined />}>

			</SysFab>
		</Container>
	);
};

export default Home;
