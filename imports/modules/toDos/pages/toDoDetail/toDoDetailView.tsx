import React, { useContext, useRef } from 'react';
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
import { RadioButtonUncheckedOutlined, TaskAltOutlined } from '@mui/icons-material';
import Grid from '@mui/material/Grid';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { SysTaskMoreOptions } from '../../components/SysTaskMoreOptions';

const ToDoDetailView: React.FC = React.memo(() => {
	const sysFormRef = useRef<ISysFormRef>(null);
	const { Frame, Drawer, LoadingContainer, FieldsForm, Actions } = ToDoDetailStyles;
	const descriptionRows: number = 5;
	const { user } = useContext<IAuthContext>(AuthContext);
	const {
		loading,
		document,
		onEditButtonClick,
		onSubmit,
		schema,
		mode,
		closeDialog,
		handleCloseDrawer,
		onCheckButtonClick
	} = useContext(ToDoDetailControllerContext);

	if (loading && mode === 'view') {
		return (
			<Drawer sx={{ alignItems: 'center' }}>
				<LoadingContainer>
					<CircularProgress />
					<Typography variant="body1">Aguarde, carregando informações...</Typography>
				</LoadingContainer>
			</Drawer>
		);
	} else if (loading) {
		return (
			<Frame>
				<LoadingContainer>
					<CircularProgress />
					<Typography variant="body1">Aguarde, carregando informações...</Typography>
				</LoadingContainer>
			</Frame>
		);
	}

	return (
		mode === 'view' ?
			<Drawer >
				<Box>
					<Grid container sx={{ justifyContent: 'flex-end' }}>
						<IconButton>
							<SysTaskMoreOptions
								task={document}
								onDelete={handleCloseDrawer}
								deleteDisabled={document.createdby !== user?._id}
							/>
						</IconButton>
						<IconButton onClick={handleCloseDrawer}><SysIcon name='close' /></IconButton>
					</Grid>
					<FormControlLabel
						sx={{ pl: 2 }}
						control={
							<Checkbox
								edge="start"
								checked={document.done}
								icon={<RadioButtonUncheckedOutlined />}
								checkedIcon={<TaskAltOutlined />}
								onChange={(event) => onCheckButtonClick!({ ...document, done: event.target.checked })}
							/>
						}
						label={<Typography>{document.title ?? 'Sem título'}</Typography>}
					/>
				</Box>

				<Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly', height: '100%' }}>
					<Box>
						<Typography variant='body2' sx={{ fontWeight: '700' }}>Descrição</Typography>
						<Box sx={{ height: 160, overflow: 'auto' }}>
							<Typography variant='body1' sx={{ whiteSpace: 'pre-line' }}>{document.description ?? 'Sem descrição.'}</Typography>
						</Box>
					</Box>

					<Box>
						<Typography variant='body2' sx={{ fontWeight: '700' }}>Tipo</Typography>
						<Typography variant='body1'>{document.shared}</Typography>
					</Box>

					<Box sx={{ display: 'flex', justifyContent: 'center' }}>
						<Button
							variant='outlined'
							onClick={() => onEditButtonClick!(document._id!)}
						>
							Editar
						</Button>
					</Box>

					<Box sx={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
						<Typography variant='body2' sx={{ fontWeight: '200' }}>Criada por: {document.owner}</Typography>
					</Box>
				</Box>

			</Drawer>
			:
			<Frame>
				<DialogTitle variant="subtitle1" sx={{ padding: 0 }}>
					{mode === 'create' ? 'Adicionar tarefa' : 'Editar tarefa'}
				</DialogTitle>
				<SysForm schema={schema} doc={document} mode={mode} onSubmit={onSubmit} ref={sysFormRef}>
					<FieldsForm >
						<SysTextField name="title" placeholder="Dê um título para sua tarefa" />
						<SysTextField name="description" placeholder="Adicione aqui, a descrição da tarefa" multiline={true} rows={descriptionRows} onKeyDown={(event) => { if (event.key === 'Enter') { event.stopPropagation(); } }} />
						< SysSelectField disabled={mode !== 'create' && document.createdby !== user?._id
						} name="shared" placeholder="Selecione o tipo da tarefa" />
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
});

export default ToDoDetailView;
