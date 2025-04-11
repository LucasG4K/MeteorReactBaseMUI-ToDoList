import React, { useContext, useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { ToDoListControllerContext } from './toDoListController';
import ToDoListStyles from './toDoListStyles';
import SysTextField from '../../../../ui/components/sysFormFields/sysTextField/sysTextField';
import { SysCheckBox } from '/imports/ui/components/sysFormFields/sysCheckBoxField/sysCheckBoxField';
import SysIcon from '../../../../ui/components/sysIcon/sysIcon';
import { SysFab } from '../../../../ui/components/sysFab/sysFab';
import AppLayoutContext, { IAppLayoutContext } from '/imports/app/appLayoutProvider/appLayoutContext';
import List from '@mui/material/List';
import IconButton from '@mui/material/IconButton';
import { SysTaskCard } from '../../components/SysTaskCard';
import { SysTabs } from '/imports/ui/components/sysTabs/sysTabs';


const ToDoListView = () => {
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

	const controller = useContext(ToDoListControllerContext);
	const { todoListNotDone, todoListDone, loading, onChangeTextField, onAddButtonClick, onChangeCategory, onTaskDetailClick, drawerOpen } = controller;
	const { Container, LoadingContainer, SearchContainer, TaskStatus, TabView } = ToDoListStyles;

	const [tab, setTab] = useState(tabs[0].value);
	const [showListDone, setShowListDone] = useState<boolean[]>([true, true]);       // [minhas tarefas DONE, tarefas do time DONE]
	const [showListNotDone, setShowListNotDone] = useState<boolean[]>([true, true]); // [minhas tarefas NOT DONE, tarefas do time NOT DONE]

	const tabIndex = tabs.indexOf(tabs.find((item) => item.value === tab)!);

	return (
		<Container sx={{ width: drawerOpen ? '70%' : '100%' }}>

			<TabView>
				<SysTabs
					abas={tabs}
					value={tab}
					handleChange={(_, newValue) => {
						setTab(newValue);
						onChangeCategory(newValue);
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
						<IconButton onClick={() => tabIndex === 0 ?
							setShowListNotDone([!showListNotDone[0], showListNotDone[1]])
							: setShowListNotDone([showListNotDone[0], !showListNotDone[1]])}
						>
							{showListNotDone[tabIndex] ? <SysIcon name={'expandMore'} /> : <SysIcon name={'chevronRight'} />}
						</IconButton>
						<Typography variant='h3'>{`Não Concluídas (${todoListNotDone.length})`}</Typography>
					</TaskStatus>

					{showListNotDone[tabIndex] &&
						<List>
							{todoListNotDone.map((task) => {
								return (
									<SysTaskCard
										key={task._id}
										task={task}
										onClick={() => onTaskDetailClick(task._id)}
									/>
								)
							})}
						</List>
					}

					<TaskStatus container={true}>
						<IconButton onClick={() => tabIndex === 0 ?
							setShowListDone([!showListDone[0], showListDone[1]])
							: setShowListDone([showListDone[0], !showListDone[1]])}
						>
							{showListDone[tabIndex] ? <SysIcon name={'expandMore'} /> : <SysIcon name={'chevronRight'} />}
						</IconButton>
						<Typography variant='h3'>{`Concluídas (${todoListDone.length})`}</Typography>
					</TaskStatus>

					{showListDone[tabIndex] &&
						<List>
							{todoListDone.map((task) => {
								return (
									<SysTaskCard
										key={task._id}
										task={task}
										onClick={() => onTaskDetailClick(task._id)}
									/>
								)
							})}
						</List>
					}
				</Box>
			)}

			<SysFab
				variant="extended"
				text="Adicionar"
				fixed
				startIcon={<SysIcon name={'add'} />}
				onClick={onAddButtonClick}
			/>
		</Container>
	);
};

export default ToDoListView;
