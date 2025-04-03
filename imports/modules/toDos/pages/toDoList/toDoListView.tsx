import React, { useContext, useState } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { ToDoListControllerContext } from './toDoListController';
import { useNavigate } from 'react-router-dom';
import DeleteDialog from '../../../../ui/appComponents/showDialog/custom/deleteDialog/deleteDialog';
import ToDoListStyles from './toDoListStyles';
import SysTextField from '../../../../ui/components/sysFormFields/sysTextField/sysTextField';
import { SysCheckBox } from '/imports/ui/components/sysFormFields/sysCheckBoxField/sysCheckBoxField';
import SysIcon from '../../../../ui/components/sysIcon/sysIcon';
import { SysFab } from '../../../../ui/components/sysFab/sysFab';
import AppLayoutContext, { IAppLayoutContext } from '/imports/app/appLayoutProvider/appLayoutContext';
import List from '@mui/material/List';
import { IToDo } from '../../api/toDoSch';
import { Checkbox, Divider, IconButton, ListItem, ListItemButton, ListItemIcon, ListItemText, Menu, MenuItem, Tooltip } from '@mui/material';
import { DeleteOutlineOutlined, EditOutlined, MoreVertOutlined } from '@mui/icons-material';
import { SysTaskCard } from '../../components/SysTaskCard';

const ToDoListView = () => {
	const controller = React.useContext(ToDoListControllerContext);
	const { todoListNotDone, todoListDone, loading, onChangeTextField, onAddButtonClick } = controller;
	const sysLayoutContext = useContext<IAppLayoutContext>(AppLayoutContext);
	const navigate = useNavigate();
	const { Container, LoadingContainer, SearchContainer } = ToDoListStyles;

	return (
		<Container>
			<Typography variant="h5">Lista de Tarefas</Typography>
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
					<Typography variant='h3'>{`Não Concluídas (${0})`}</Typography>
					<List>
						{todoListNotDone.map((task) => {
							return (
								<SysTaskCard
									task={task}
								/>
							)
						})}
					</List>

					<Typography variant='h3'>{`Concluídas (${0})`}</Typography>
					<List>
						{todoListDone.map((task) => {
							return (
								<SysTaskCard
									task={task}
								/>
							)
						})}
					</List>
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
