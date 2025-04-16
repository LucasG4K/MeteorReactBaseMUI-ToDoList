import React, { useContext, useMemo, useState } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { ToDoListControllerContext } from './toDoListController';
import ToDoListStyles from './toDoListStyles';
import SysTextField from '../../../../ui/components/sysFormFields/sysTextField/sysTextField';
import { SysCheckBox } from '/imports/ui/components/sysFormFields/sysCheckBoxField/sysCheckBoxField';
import SysIcon from '../../../../ui/components/sysIcon/sysIcon';
import { SysFab } from '../../../../ui/components/sysFab/sysFab';
import List from '@mui/material/List';
import IconButton from '@mui/material/IconButton';
import { SysTaskCard } from '../../components/SysTaskCard';
import { SysTabs } from '/imports/ui/components/sysTabs/sysTabs';
import ToDoDetailController from '../toDoDetail/toDoDetailController';
import { useNavigate } from 'react-router-dom';
import { Pagination } from '@mui/material';


const ToDoListView: React.FC = React.memo(() => {
	const tabs = [
		{
			label: 'Minhas Tarefas',
			value: 'Minhas Tarefas'
		},
		{
			label: 'Tarefas do Time',
			value: 'Tarefas do Time'
		}
	]

	const {
		page,
		setPage,
		totalPages,
		todoList,
		onChangeTextField,
		onAddButtonClick,
		pathname,
	} = useContext(ToDoListControllerContext);


	const {
		loading,
		listDone,
		listNotDone,
		doneCount,
		notDoneCount
	} = todoList;

	const { Container, LoadingContainer, SearchContainer, TaskStatus, TabView } = ToDoListStyles;

	const [tab, setTab] = useState<string>('');
	const [showDone, setShowDone] = useState<boolean>(true);
	const [showNotDone, setShowNotDone] = useState<boolean>(true);

	const [open, setOpen] = useState<boolean>(false);
	const [selectedTask, setSelectedTask] = useState<string>('');

	const navigate = useNavigate();

	useMemo(() => {
		setShowDone(true);
		setShowNotDone(true);
		setOpen(false);
		setSelectedTask('');
		pathname === '/todo' ? setTab(tabs[0].value) : setTab(tabs[1].value)
	}, [pathname]);

	return (

		<Box sx={{ width: '100%', height: '92vh', display: 'flex' }}>
			<Container>
				<TabView>
					<SysTabs
						abas={tabs}
						value={tab}
						handleChange={() => {
							if (pathname === '/todo') {
								navigate('/todo/group');
							} else {
								navigate('/todo')
							}
						}}
					/>
				</TabView>

				<SearchContainer>
					<SysTextField
						name="search"
						placeholder="Procurar por tarefa(s)"
						onChange={onChangeTextField}
						startAdornment={<SysIcon name={'search'} />}
					/>
					<SysCheckBox name={'Concluído'} />
				</SearchContainer>


				{loading ? (
					<LoadingContainer>
						<CircularProgress />
						<Typography variant="body1">Aguarde, carregando informações...</Typography>
					</LoadingContainer>
				) : (
					<Box sx={{ width: '100%' }}>

						<TaskStatus container={true}>
							<IconButton onClick={() => setShowNotDone((prev) => !prev)}
							>
								{showNotDone ? <SysIcon name={'expandMore'} /> : <SysIcon name={'chevronRight'} />}
							</IconButton>
							<Typography variant='h3'>{`Não Concluídas (${notDoneCount})`}</Typography>
						</TaskStatus>

						{showNotDone &&
							<>
								<List>
									{listNotDone.map((task) => {
										return (
											<SysTaskCard
												key={task._id}
												task={task}
												onClick={() => { setSelectedTask(task._id!); setOpen(true) }}
											/>
										)
									})}
								</List>
								<Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
									<Pagination
										count={totalPages!.notDone}
										page={page!.notDone}
										onChange={(_, i: number) => setPage!({ notDone: i, done: page!.done })}
									/>
								</Box>
							</>
						}

						<TaskStatus container={true}>
							<IconButton onClick={() => setShowDone((prev) => !prev)}>
								{showDone ? <SysIcon name={'expandMore'} /> : <SysIcon name={'chevronRight'} />}
							</IconButton>
							<Typography variant='h3'>{`Concluídas (${doneCount})`}</Typography>
						</TaskStatus>

						{showDone &&
							<>
								<List>
									{listDone.map((task) => {
										return (
											<SysTaskCard
												key={task._id}
												task={task}
												onClick={() => { setSelectedTask(task._id!); setOpen(true) }}
											/>
										)
									})}
								</List>
								<Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
									<Pagination
										count={totalPages!.done}
										page={page!.done}
										onChange={(_, i: number) => setPage!({ done: i, notDone: page!.notDone })}
									/>
								</Box>
							</>
						}
					</Box>
				)}

				<SysFab
					sx={{
						position: open ? 'fixed' : 'absolute',
						bottom: '56px',
						left: open ? '30%' : '50%',
						transform: 'translateX(-50%)',
					}}
					variant="extended"
					text="Adicionar Tarefa"
					startIcon={<SysIcon name={'add'} />}
					onClick={onAddButtonClick}
				/>
			</Container >
			{open && (
				<Box
					sx={{
						boxShadow: 4,
						position: 'relative',
					}}
				>
					<ToDoDetailController close={() => setOpen(false)} id={selectedTask} mode="view" />
				</Box>

			)}
		</Box>
	);
});

export default ToDoListView;
