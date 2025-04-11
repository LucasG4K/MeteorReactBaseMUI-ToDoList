import React, { useContext, useEffect, useRef } from 'react';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import { ToDoDetailControllerContext } from './toDoDetailController';
import SysForm from '../../../../ui/components/sysForm/sysForm';
import SysTextField from '../../../../ui/components/sysFormFields/sysTextField/sysTextField';
import ToDoDetailStyles from './toDoDetailStyles';
import { SysSelectField } from '../../../../ui/components/sysFormFields/sysSelectField/sysSelectField';
import { ISysFormRef } from '../../../../ui/components/sysForm/typings';
import SysFormButton from '../../../../ui/components/sysFormFields/sysFormButton/sysFormButton';
import SysIcon from '../../../../ui/components/sysIcon/sysIcon';
import AuthContext, { IAuthContext } from '/imports/app/authProvider/authContext';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { MoreVertOutlined, RadioButtonUncheckedOutlined, TaskAltOutlined } from '@mui/icons-material';
import Grid from '@mui/material/Grid';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const ToDoDetailView = () => {
	const { user } = useContext<IAuthContext>(AuthContext);
	const sysFormRef = useRef<ISysFormRef>(null);
	const { Frame, LoadingContainer, FieldsForm, Actions } = ToDoDetailStyles;
	const descriptionRows: number = 5;
	const controller = useContext(ToDoDetailControllerContext);
	const { loading, document, onEditButtonClick, onSubmit, schema, mode, closeDialog, handleCloseDrawer, onCheckButtonClick } = controller;

	if (loading)
		return (
			<Frame>
				<LoadingContainer>
					<CircularProgress />
					<Typography variant="body1">Aguarde, carregando informações...</Typography>
				</LoadingContainer>
			</Frame>
		);

	return (
		mode === 'view' ?
			<Frame >
				<Grid container sx={{ justifyContent: 'flex-end' }}>
					<IconButton><MoreVertOutlined /></IconButton>
					<IconButton onClick={handleCloseDrawer}><SysIcon name='close' /></IconButton>
				</Grid>
				<FormControlLabel
					control={
						<Checkbox
							edge="start"
							checked={document.done}
							icon={<RadioButtonUncheckedOutlined />}
							checkedIcon={<TaskAltOutlined />}
							onChange={(event) => onCheckButtonClick({ ...document, done: event.target.checked })}
						/>
					}
					label={
						<Typography>{document.title ?? 'Sem título'}</Typography>
					}
				/>
				<Box>
					<Typography variant='body1' sx={{ fontWeight: '700' }}>Descrição</Typography>
					<Typography variant='body1'>{document.description}</Typography>
				</Box>
				<Box>
					<Typography variant='body1' sx={{ fontWeight: '700' }}>Tipo</Typography>
					<Typography variant='body1'>{document.shared}</Typography>
				</Box>
				<Button onClick={() => onEditButtonClick(document)}>Editar</Button>
				<Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
					<Typography variant='body2' sx={{ fontWeight: '200' }}>Criada por: {document.owner}</Typography>
				</Box>
			</Frame>
			:
			<Frame>
				<DialogTitle variant="subtitle1" sx={{ padding: 0 }}>
					{mode === 'create' ? 'Adicionar tarefa' : 'Editar tarefa'}
				</DialogTitle>
				<SysForm schema={schema} doc={document} mode={mode} onSubmit={onSubmit} ref={sysFormRef}>
					<FieldsForm >
						<SysTextField name="title" placeholder="Dê um título para sua tarefa" />
						<SysTextField name="description" placeholder="Adicione aqui, a descrição da tarefa" multiline={true} rows={descriptionRows} />
						<SysSelectField disabled={mode !== 'create' && document.createdby !== user?._id} name="shared" placeholder="Selecione o tipo da tarefa" />
						<Actions>
							<Button variant="outlined" startIcon={<SysIcon name={'close'} />} onClick={closeDialog}>
								Cancelar
							</Button>
							<SysFormButton startIcon={<SysIcon name={'check'} />}>Salvar</SysFormButton>
						</Actions>
					</FieldsForm>
				</SysForm>
			</Frame>
	);
};

export default ToDoDetailView;
