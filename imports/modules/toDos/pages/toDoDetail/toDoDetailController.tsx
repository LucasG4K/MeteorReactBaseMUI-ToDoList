import React, { createContext, useCallback, useContext } from 'react';
import ToDoDetailView from './toDoDetailView';
import { useTracker } from 'meteor/react-meteor-data';
import { toDoApi } from '../../api/toDoApi';
import { IToDo } from '../../api/toDoSch';
import { ISchema } from '../../../../typings/ISchema';
import { IMeteorError } from '../../../../typings/BoilerplateDefaultTypings';
import AppLayoutContext, { IAppLayoutContext } from '/imports/app/appLayoutProvider/appLayoutContext';
import { sysSizing } from '/imports/ui/materialui/styles';

interface IToDoDetailContollerContext {
	document: IToDo;
	loading: boolean;
	schema: ISchema<IToDo>;
	onSubmit: (doc: IToDo) => void;
	onEditButtonClick: (doc: IToDo) => void;
	onCheckButtonClick: (doc: IToDo) => void;
	mode: 'create' | 'edit' | 'view';
	closeDialog: () => void;
	closeDrawer: () => void;
}

interface IDetailController {
	mode: 'create' | 'edit' | 'view';
	id?: string;
}

export const ToDoDetailControllerContext = createContext<IToDoDetailContollerContext>(
	{} as IToDoDetailContollerContext
);

const ToDoDetailController = ({ id, mode }: IDetailController) => {
	const { showNotification, showDialog, closeDialog, closeDrawer } = useContext<IAppLayoutContext>(AppLayoutContext);

	const { document, loading } = useTracker(() => {
		const subHandle = toDoApi.subscribe('toDoDetail', { _id: id });
		const document = subHandle?.ready() ? toDoApi.findOne({ _id: id }) : {};
		return {
			document: document as IToDo,
			loading: !!subHandle && !subHandle?.ready()
		};
	}, [id]);

	const onEditButtonClick = useCallback((doc: IToDo) => {
		showDialog({
			sx: { borderRadius: sysSizing.radiusMd },
			children: <ToDoDetailController id={doc._id} mode="edit" />
		});
	}, []
	);

	const onCheckButtonClick = useCallback((doc: IToDo) => {
		toDoApi.update(doc);
	}, [document]);

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
				closeDialog,
				closeDrawer,
			}}>
			{<ToDoDetailView />}
		</ToDoDetailControllerContext.Provider>
	);
};

export default ToDoDetailController;
