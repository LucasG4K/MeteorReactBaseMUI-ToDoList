import React, { useContext } from 'react';
import Typography from '@mui/material/Typography';
import HomeStyles from './homeStyle';
import AuthContext, { IAuthContext } from '/imports/app/authProvider/authContext';
import Box from '@mui/material/Box';
import { SysFab } from '/imports/ui/components/sysFab/sysFab';
import { KeyboardDoubleArrowRightOutlined } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { SysTaskCard } from '/imports/modules/toDos/components/SysTaskCard';
import List from '@mui/material/List';
import CircularProgress from '@mui/material/CircularProgress';
import { HomeControllerContext } from './homeController';
import Grid from '@mui/material/Grid';

const HomeView: React.FC = () => {
	const { user } = useContext<IAuthContext>(AuthContext);
	const { toDosRecent, loading } = useContext(HomeControllerContext);
	const navigate = useNavigate();

	const { Container, LoadingContainer } = HomeStyles;

	// console.log(toDosRecent);

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
				sx={{
					position: 'absolute',
					bottom: '56px',
					left: '50%',
					transform: 'translateX(-50%)'
				}}
				text='Ir para tarefas'
				onClick={() => navigate('/todo')}
				endIcon={<KeyboardDoubleArrowRightOutlined />}
			/>

		</Container >
	);
};

export default HomeView;