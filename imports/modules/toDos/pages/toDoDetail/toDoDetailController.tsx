import React, { createContext, useCallback, useContext } from 'react';
import ToDoDetailView from './toDoDetailView';
import { useTracker } from 'meteor/react-meteor-data';
import { toDoApi } from '../../api/toDoApi';
import { IToDo } from '../../api/toDoSch';
import { ISchema } from '../../../../typings/ISchema';
import { IMeteorError } from '../../../../typings/BoilerplateDefaultTypings';
import AppLayoutContext, { IAppLayoutContext } from '/imports/app/appLayoutProvider/appLayoutContext';
import { sysSizing } from '/imports/ui/materialui/styles';
import { ToDoModuleContext } from '../../toDoContainer';

interface IToDoDetailContollerContext {
	document: IToDo;
	loading: boolean;
	schema: ISchema<IToDo>;
	onSubmit: (doc: IToDo) => void;
	onEditButtonClick?: (id: string) => void;
	onDeleteButtonClick?: (task: IToDo) => void;
	onCheckButtonClick?: (task: IToDo) => void;
	mode: 'create' | 'edit' | 'view';
	handleCloseDrawer: () => void;
	closeDialog: () => void;
}

interface IDetailController {
	close?: () => void;
	mode: 'create' | 'edit' | 'view';
	id?: string;
}

export const ToDoDetailControllerContext = createContext<IToDoDetailContollerContext>(
	{} as IToDoDetailContollerContext
);

const ToDoDetailController = ({ id, mode, close }: IDetailController) => {
	const { showNotification, closeDialog } = useContext<IAppLayoutContext>(AppLayoutContext);
	const { onEditButtonClick, onCheckButtonClick, onDeleteButtonClick } = useContext(ToDoModuleContext);

	const { document, loading } = useTracker(() => {
		const subHandle = toDoApi.subscribe('toDoDetail', { _id: id });
		const document = subHandle?.ready() ? toDoApi.findOne({ _id: id }) : {};
		return {
			document: document as IToDo,
			loading: !!subHandle && !subHandle?.ready()
		};
	}, [id]);

	const onSubmit = useCallback((doc: IToDo) => {
		toDoApi['upsert'](doc, (e: IMeteorError) => {
			if (!e) {
				showNotification({
					type: 'success',
					title: 'Operação realizada!',
					message: `Tarefa ${mode === 'edit' ? 'atualizada' : 'cadastrada'} com sucesso!`
				});
			} else {
				showNotification({
					type: 'error',
					title: 'Operação não realizada!',
					message: `Erro ao realizar a operação: ${e.reason}`
				});
			}
			closeDialog();
		});
	}, [document]);

	return (
		<ToDoDetailControllerContext.Provider
			value={{
				document,
				loading,
				schema: toDoApi.getSchema(),
				mode,
				onSubmit,
				onEditButtonClick,
				onCheckButtonClick,
				onDeleteButtonClick,
				closeDialog,
				handleCloseDrawer: close!,
			}}>
			{<ToDoDetailView />}
		</ToDoDetailControllerContext.Provider>
	);
};

export default ToDoDetailController;
