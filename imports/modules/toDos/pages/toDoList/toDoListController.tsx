import React, { useCallback, useContext, useMemo } from 'react';
import ToDoListView from './toDoListView';
import { nanoid } from 'nanoid';
import { useNavigate } from 'react-router-dom';
import { useTracker } from 'meteor/react-meteor-data';
import { ISchema } from '../../../../typings/ISchema';
import { IToDo } from '../../api/toDoSch';
import { toDoApi } from '../../api/toDoApi';
import AppLayoutContext, { IAppLayoutContext } from '/imports/app/appLayoutProvider/appLayoutContext';
import ToDoDetailController from '../toDoDetail/toDoDetailController';
import { sysSizing } from '/imports/ui/materialui/styles';

interface IInitialConfig {
	sortProperties: { field: string; sortAscending: boolean };
	filter: Object;
	searchBy: string | null;
	viewComplexTable: boolean;
}

interface IToDoListContollerContext {
	onAddButtonClick: () => void;
	onDeleteButtonClick: (row: any) => void;
	todoListNotDone: IToDo[];
	todoListDone: IToDo[];
	schema: ISchema<any>;
	loading: boolean;
	onChangeTextField: (event: React.ChangeEvent<HTMLInputElement>) => void;
	onChangeCategory: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const ToDoListControllerContext = React.createContext<IToDoListContollerContext>(
	{} as IToDoListContollerContext
);

const initialConfig = {
	sortProperties: { field: 'createdat', sortAscending: true },
	filter: {},
	searchBy: null,
	viewComplexTable: false
};

const ToDoListController = () => {
	const [config, setConfig] = React.useState<IInitialConfig>(initialConfig);
	const { showNotification, showDialog } = useContext<IAppLayoutContext>(AppLayoutContext);

	const { title, date, done, shared, picture } = toDoApi.getSchema();
	const toDoSchReduzido = { title, date, done, shared, picture, createdat: { type: Date, label: 'Criado em' }, cretedby: {type: String, label: 'Criado por'} };

	const { sortProperties, filter } = config;
	const sort = {
		[sortProperties.field]: sortProperties.sortAscending ? 1 : -1
	};

	const { loading, toDosNotDone, toDosDone } = useTracker(() => {
		const subHandle = toDoApi.subscribe('toDoList', filter, {
			sort
		});

		const toDosNotDone = subHandle?.ready() ? toDoApi.find({ ...filter, done: {$ne: true} }, { sort }).fetch() : [];
		const toDosDone = subHandle?.ready() ? toDoApi.find({ ...filter, done: true }, { sort }).fetch() : [];
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

	const onEdit = useCallback(
		(id: string) => {
			showDialog({
				sx: { borderRadius: sysSizing.radiusMd },
				children: <ToDoDetailController id={id} mode="edit" />
			});
		},
		[toDosNotDone, toDosDone]
	);

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

	const onSelectedCategory = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
		const { value } = event.target;
		if (!value) {
			setConfig((prev) => ({
				...prev,
				filter: {
					...prev.filter,
					type: { $ne: null }
				}
			}));
			return;
		}
		setConfig((prev) => ({ ...prev, filter: { ...prev.filter, type: value } }));
	}, []);

	const providerValues: IToDoListContollerContext = useMemo(
		() => ({
			onAddButtonClick,
			onDeleteButtonClick,
			todoListNotDone: toDosNotDone,
			todoListDone: toDosDone,
			schema: toDoSchReduzido,
			loading,
			onChangeTextField,
			onChangeCategory: onSelectedCategory
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
