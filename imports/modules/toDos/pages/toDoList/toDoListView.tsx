import React, { useContext, useState } from 'react';
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
import { ChevronRightOutlined, ExpandMoreOutlined } from '@mui/icons-material';
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

	const sysLayoutContext = useContext<IAppLayoutContext>(AppLayoutContext);
	const controller = React.useContext(ToDoListControllerContext);
	const { todoListNotDone, todoListDone, loading, onChangeTextField, onAddButtonClick, onChangeCategory } = controller;
	const { Container, LoadingContainer, SearchContainer, TaskStatus, TabView } = ToDoListStyles;


	const [tab, setTab] = useState(tabs[0].value);
	const [showListDone, setShowListDone] = useState<boolean>(true);
	const [showListNotDone, setShowListNotDone] = useState<boolean>(true);

	return (
		<Container>

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
						<IconButton onClick={() => setShowListNotDone(!showListNotDone)}>
							{showListNotDone ? <ExpandMoreOutlined /> : <ChevronRightOutlined />}
						</IconButton>
						<Typography variant='h3'>{`Não Concluídas (${todoListNotDone.length})`}</Typography>
					</TaskStatus>

					{showListNotDone &&
						<List>
							{todoListNotDone.map((task, index) => {
								return (
									<SysTaskCard task={task} key={index} />
								)
							})}
						</List>
					}

					<TaskStatus container={true}>
						<IconButton onClick={() => setShowListDone(!showListDone)}>
							{showListDone ? <ExpandMoreOutlined /> : <ChevronRightOutlined />}
						</IconButton>
						<Typography variant='h3'>{`Concluídas (${todoListDone.length})`}</Typography>
					</TaskStatus>

					{showListDone &&
						<List>
							{todoListDone.map((task, index) => {
								return (
									<SysTaskCard task={task} key={index} />
								)
							})}
						</List>
					}
				</Box>
			)}

			<SysFab
				// sx={{ width: 'auto', left: '50%', transform: 'translateX(-50%)' }}
				variant="extended"
				text="Adicionar"
				startIcon={<SysIcon name={'add'} />}
				fixed={true}
				onClick={onAddButtonClick}
			/>
		</Container>
	);
};

export default ToDoListView;
