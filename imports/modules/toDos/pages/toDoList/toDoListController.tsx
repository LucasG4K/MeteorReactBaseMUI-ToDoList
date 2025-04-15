import React, { useState, useCallback, useContext, useMemo } from 'react';
import { nanoid } from 'nanoid';
import { useTracker } from 'meteor/react-meteor-data';
import { ISchema } from '../../../../typings/ISchema';
import { IToDo } from '../../api/toDoSch';
import { toDoApi } from '../../api/toDoApi';
import AppLayoutContext, { IAppLayoutContext } from '/imports/app/appLayoutProvider/appLayoutContext';
import ToDoDetailController from '../toDoDetail/toDoDetailController';
import { sysSizing } from '/imports/ui/materialui/styles';
import ToDoListView from './toDoListView';
import { ToDoModuleContext } from '../../toDoContainer';

interface IInitialConfig {
	sortProperties: { field: string; sortAscending: boolean };
	filter: Object;
	searchBy: string | null;
	viewComplexTable: boolean;
}

interface IToDoListContollerContext {
	onAddButtonClick: () => void;
	onEditButtonClick?: (id: string) => void;
	onCheckButtonClick?: (task: IToDo) => void;
	onDeleteButtonClick?: (task: IToDo) => void;
	page?: { notDone: number; done: number };
	totalPages?: { notDone: number; done: number };
	setPage?: React.Dispatch<React.SetStateAction<{ notDone: number; done: number }>>;
	todoList: IToDoListData;
	schema: ISchema<any>;
	loading: boolean;
	onChangeTextField: (event: React.ChangeEvent<HTMLInputElement>) => void;
	pathname?: string;
}

export const ToDoListControllerContext = React.createContext<IToDoListContollerContext>(
	{} as IToDoListContollerContext
);

const initialConfig = {
	sortProperties: { field: 'createdat', sortAscending: false },
	filter: {},
	searchBy: null,
	viewComplexTable: false
};

const ToDoListController = () => {
	const [config, setConfig] = useState<IInitialConfig>(initialConfig);
	const { showDialog } = useContext<IAppLayoutContext>(AppLayoutContext);
	const { pathname, onEditButtonClick, onCheckButtonClick, onDeleteButtonClick } = useContext(ToDoModuleContext);

	const { title, date, done, shared, picture } = toDoApi.getSchema();
	const toDoSchReduzido = {
		title,
		date,
		done,
		shared,
		picture,
		createdat: { type: Date, label: 'Criado em' },
		cretedby: { type: String, label: 'Criado por' }
	};

	const { filter, sortProperties } = config;
	const sort = {
		[sortProperties.field]: sortProperties.sortAscending ? 1 : -1
	}

	const [page, setPage] = useState({ notDone: 1, done: 1 }); // [0]: Not Done - [1]: Done
	const limit = 4;

	const { todoList } = useTracker(() => {

		const subHandle = toDoApi.subscribe('toDoList', filter);

		if (!subHandle?.ready()) {
			return {
				todoList: {
					loading: true,
					listDone: [],
					listNotDone: [],
					notDoneCount: 0,
					doneCount: 0,
				},
			};
		}

		const sharedFilter = pathname === '/todo' ? 'Minhas Tarefas' : 'Tarefas do Time';
		const baseQuery = { ...filter, shared: sharedFilter };

		const listNotDone = toDoApi.find(
			{ ...baseQuery, done: { $ne: true } },
			{
				sort,
				skip: (page.notDone - 1) * limit,
				limit,
			}
		).fetch();

		const listDone = toDoApi.find(
			{ ...baseQuery, done: true },
			{
				sort,
				skip: (page.done - 1) * limit,
				limit,
			}
		).fetch();

		const doneCount = toDoApi.find({ ...baseQuery, done: true }).count();
		const notDoneCount = toDoApi.find({ ...baseQuery, done: { $ne: true } }).count();

		return {
			todoList: {
				loading: false,
				listDone,
				listNotDone,
				doneCount,
				notDoneCount,
			},
		};
	}, [config, pathname, page]);

	// [0]: Not Done - [1]: Done
	const totalPages = {
		notDone: Math.ceil(todoList.notDoneCount / limit),
		done: Math.ceil(todoList.doneCount / limit),
	}

	const onAddButtonClick = useCallback(() => {
		showDialog({
			sx: { borderRadius: sysSizing.radiusMd },
			children: <ToDoDetailController id={nanoid()} mode="create" />
		});
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

	const providerValues: IToDoListContollerContext = useMemo(
		() => ({
			onAddButtonClick,
			onEditButtonClick,
			onCheckButtonClick,
			onDeleteButtonClick,
			page,
			totalPages,
			setPage,
			todoList,
			schema: toDoSchReduzido,
			loading: todoList.loading,
			onChangeTextField,
			pathname,
		}),
		[todoList]
	);

	return (
		<ToDoListControllerContext.Provider value={providerValues}>
			<ToDoListView />
		</ToDoListControllerContext.Provider>
	);
};

export default ToDoListController;

interface IToDoListData {
	loading: boolean;
	listDone: IToDo[];
	listNotDone: IToDo[];
	doneCount: number;
	notDoneCount: number;
}
