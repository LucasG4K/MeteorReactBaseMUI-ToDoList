import React, { useContext } from 'react';
import Typography from '@mui/material/Typography';
import HomeStyles from './homeStyle';
import AuthContext, { IAuthContext } from '/imports/app/authProvider/authContext';
import Box from '@mui/material/Box';
import { SysFab } from '/imports/ui/components/sysFab/sysFab';
import { KeyboardDoubleArrowRightOutlined } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import ToDoListController, { ToDoListControllerContext, useToDo } from '/imports/modules/toDos/pages/toDoList/toDoListController';
import { SysTaskCard } from '/imports/modules/toDos/components/SysTaskCard';
import List from '@mui/material/List';
import CircularProgress from '@mui/material/CircularProgress';

export default function () {
	return (
		<ToDoListController>
			<Home />
		</ToDoListController>
	)
}

const Home: React.FC = () => {
	const { user } = useContext<IAuthContext>(AuthContext);
	const { toDosRecent, loading } = useContext(ToDoListControllerContext);
	const navigate = useNavigate();

	const { Container, LoadingContainer } = HomeStyles;

	return (
		<Container>

			<Box>
				<Typography variant='h1'>Olá, {user?.username}</Typography>
				<Typography variant='body1' sx={{ whiteSpace: 'pre-wrap' }}>{'    |'}</Typography>
				<Typography variant='body1'>Seus projetos muito mais organizados. Veja as tarefas adicionadas por seu time, por você e para você!</Typography>
			</Box>

			<Typography variant='h3'>Adicionadas recentemente</Typography>

			{loading ?
				<LoadingContainer>
					<CircularProgress />
					<Typography variant="body1">Aguarde, carregando informações...</Typography>
				</LoadingContainer>
				:
				toDosRecent && toDosRecent.length > 0 ?
					<List sx={{ width: '100%' }}>
						{toDosRecent.map((task) => {
							return (
								<SysTaskCard
									key={task._id}
									task={task} />
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
				endIcon={<KeyboardDoubleArrowRightOutlined />}
			/>

		</Container>
	);
};

