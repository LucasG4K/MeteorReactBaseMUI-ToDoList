import React, { createContext, useCallback, useContext } from 'react';
import ToDoDetailView from './toDoDetailView';
import { useTracker } from 'meteor/react-meteor-data';
import { toDoApi } from '../../api/toDoApi';
import { IToDo } from '../../api/toDoSch';
import { ISchema } from '../../../../typings/ISchema';
import { IMeteorError } from '../../../../typings/BoilerplateDefaultTypings';
import AppLayoutContext, { IAppLayoutContext } from '/imports/app/appLayoutProvider/appLayoutContext';

interface IToDoDetailContollerContext {
	document: IToDo;
	loading: boolean;
	schema: ISchema<IToDo>;
	onSubmit: (doc: IToDo) => void;
	mode: 'create' | 'edit';
	closeDialog: () => void;
}

interface IDetailController {
	mode: 'create' | 'edit';
	id?: string;
}

export const ToDoDetailControllerContext = createContext<IToDoDetailContollerContext>(
	{} as IToDoDetailContollerContext
);

const ToDoDetailController = ({ id, mode }: IDetailController) => {
	const { showNotification, closeDialog } = useContext<IAppLayoutContext>(AppLayoutContext);

	const { document, loading } = useTracker(() => {
		const subHandle = toDoApi.subscribe('toDoDetail', { _id: id });
		const document = subHandle?.ready() ? toDoApi.findOne({ _id: id }) : {};
		return {
			document: document as IToDo,
			loading: !!subHandle && !subHandle?.ready()
		};
	}, [id]);

	const onSubmit = useCallback((doc: IToDo) => {
		console.log(doc);
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
				closeDialog,
			}}>
			{<ToDoDetailView />}
		</ToDoDetailControllerContext.Provider>
	);
};

export default ToDoDetailController;
