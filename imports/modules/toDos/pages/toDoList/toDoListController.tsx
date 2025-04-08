import React, { useState, useCallback, useContext, useMemo } from 'react';
import ToDoListView from './toDoListView';
import { nanoid } from 'nanoid';
import { useTracker } from 'meteor/react-meteor-data';
import { ISchema } from '../../../../typings/ISchema';
import { IToDo } from '../../api/toDoSch';
import { toDoApi } from '../../api/toDoApi';
import AppLayoutContext, { IAppLayoutContext } from '/imports/app/appLayoutProvider/appLayoutContext';
import ToDoDetailController from '../toDoDetail/toDoDetailController';
import { sysSizing } from '/imports/ui/materialui/styles';
import AuthContext, { IAuthContext } from '/imports/app/authProvider/authContext';

interface IInitialConfig {
	sortProperties: { field: string; sortAscending: boolean };
	filter: Object;
	searchBy: string | null;
	viewComplexTable: boolean;
}

interface IToDoListContollerContext {
	onAddButtonClick: () => void;
	onEditButtonClick: (row: any) => void;
	onTaskDetailClick: (row: any) => void;
	onCheckButtonClick: (row: any) => void;
	onDeleteButtonClick: (row: any) => void;
	todoListNotDone: IToDo[];
	todoListDone: IToDo[];
	schema: ISchema<any>;
	loading: boolean;
	onChangeTextField: (event: React.ChangeEvent<HTMLInputElement>) => void;
	onChangeCategory: (value: string) => void;
}

export const ToDoListControllerContext = React.createContext<IToDoListContollerContext>(
	{} as IToDoListContollerContext
);


const initialConfig = {
	sortProperties: { field: 'createdat', sortAscending: true },
	filter: { shared: 'Minhas Tarefas' },
	searchBy: null,
	viewComplexTable: false
};

const ToDoListController = () => {
	const [config, setConfig] = useState<IInitialConfig>(initialConfig);
	const [toggleShowDrawer, setToggleShowDrawer] = useState<boolean>(false);
	const { showDialog, showDrawer } = useContext<IAppLayoutContext>(AppLayoutContext);
	const { user } = useContext<IAuthContext>(AuthContext);

	const { title, date, done, shared, picture } = toDoApi.getSchema();
	const toDoSchReduzido = { title, date, done, shared, picture, createdat: { type: Date, label: 'Criado em' }, cretedby: { type: String, label: 'Criado por' } };

	const { filter } = config;

	const sharedFilter = {
		...filter,
		$or: [{ shared: 'Tarefas do Time' }, { createdby: user?._id }]
	}

	const { loading, toDosNotDone, toDosDone } = useTracker(() => {

		const subHandle = toDoApi.subscribe('toDoList', sharedFilter);

		const toDosNotDone = subHandle?.ready() ? toDoApi.find({ ...sharedFilter, done: { $ne: true } }, { createdat: 1 }).fetch() : [];
		const toDosDone = subHandle?.ready() ? toDoApi.find({ ...sharedFilter, done: true }, { createdat: 1 }).fetch() : [];

		return {
			toDosNotDone,
			toDosDone,
			loading: !!subHandle && !subHandle.ready(),
			total: subHandle ? subHandle.total : toDosNotDone.length + toDosDone.length
		};
	}, [config]);

	const onAddButtonClick = useCallback(() => {
		showDialog({
			sx: { borderRadius: sysSizing.radiusMd },
			children: <ToDoDetailController id={nanoid()} mode="create" />
		});
	}, [toDosNotDone]);

	const onEditButtonClick = useCallback(
		(id: string) => {
			showDialog({
				sx: { borderRadius: sysSizing.radiusMd },
				children: <ToDoDetailController id={id} mode="edit" />
			});
		},
		[toDosNotDone, toDosDone]
	);

	const onTaskDetailClick = useCallback(
		(id: string) => {
			showDrawer({
				variant: 'persistent',
				anchor: 'right',
				open: toggleShowDrawer,
				close: () => setToggleShowDrawer(false),
				children: <ToDoDetailController id={id} mode="view" />
			})
		}, []
	)

	const onCheckButtonClick = useCallback((row: any) => {
		toDoApi.update(row);
	}, []);

	const onDeleteButtonClick = useCallback((row: any) => {
		toDoApi.remove(row);
	}, []);

	const onChangeTextField = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
		const { value } = event.target;
		const delayedSearch = setTimeout(() => {
			setConfig((prev) => ({
				...prev,
				filter: { ...prev.filter, title: { $regex: value.trim(), $options: 'i' } }
			}));
		}, 1000);
		return () => clearTimeout(delayedSearch);
	}, []);

	const onChangeCategory = useCallback((value: string) => {
		if (!value) {
			setConfig((prev) => ({
				...prev,
				filter: {
					...prev.filter,
					shared: value
				}
			}));
			return;
		}
		setConfig((prev) => ({ ...prev, filter: { ...prev.filter, shared: value } }));
	}, []);

	const providerValues: IToDoListContollerContext = useMemo(
		() => ({
			onAddButtonClick,
			onEditButtonClick,
			onTaskDetailClick,
			onCheckButtonClick,
			onDeleteButtonClick,
			todoListNotDone: toDosNotDone,
			todoListDone: toDosDone,
			schema: toDoSchReduzido,
			loading,
			onChangeTextField,
			onChangeCategory,
		}),
		[toDosNotDone, toDosDone, loading]
	);

	return (
		<ToDoListControllerContext.Provider value={providerValues}>
			<ToDoListView />
		</ToDoListControllerContext.Provider>
	);
};

export default ToDoListController;
