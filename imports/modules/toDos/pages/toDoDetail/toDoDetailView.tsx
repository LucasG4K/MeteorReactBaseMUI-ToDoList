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

const ToDoDetailView = () => {
	const controller = useContext(ToDoDetailControllerContext);
	const { document, onSubmit, schema, mode, closeDialog } = controller;
	const sysFormRef = useRef<ISysFormRef>(null);
	const { Container, FieldsForm, Actions } = ToDoDetailStyles;
	const descriptionRows: number = 5;

	return (
		<Container>
			<DialogTitle variant="subtitle1" sx={{ padding: 0 }}>
				{mode === 'create' ? 'Adicionar tarefa' : 'Editar tarefa'}
			</DialogTitle>
			<SysForm schema={schema} doc={document} mode={mode} onSubmit={onSubmit} ref={sysFormRef}>
				<FieldsForm>
					<SysTextField name="title" placeholder="Dê um título para sua tarefa" />
					<SysTextField name="description" placeholder="Adicione aqui, a descrição da tarefa" multiline={true} rows={descriptionRows} />
					<SysSelectField name="shared" placeholder="Selecione o tipo da tarefa" />
					<Actions>
						<Button variant="outlined" startIcon={<SysIcon name={'close'} />} onClick={closeDialog}>
							Cancelar
						</Button>
						<SysFormButton startIcon={<SysIcon name={'check'} />}>Salvar</SysFormButton>
					</Actions>
				</FieldsForm>
			</SysForm>
		</Container>
	);
};

export default ToDoDetailView;
