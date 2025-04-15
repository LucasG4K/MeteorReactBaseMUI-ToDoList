import React, { useState, useCallback, useContext, useMemo } from 'react';
import { nanoid } from 'nanoid';
import { useTracker } from 'meteor/react-meteor-data';
import { ISchema } from '../../../../typings/ISchema';
import { IToDo } from '../../api/toDoSch';
import { toDoApi } from '../../api/toDoApi';
import AppLayoutContext, { IAppLayoutContext } from '/imports/app/appLayoutProvider/appLayoutContext';
import ToDoDetailController from '../toDoDetail/toDoDetailController';
import { sysSizing } from '/imports/ui/materialui/styles';
import AuthContext, { IAuthContext } from '/imports/app/authProvider/authContext';
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
	todoList: IToDo[];
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

	const { loading, todoList } = useTracker(() => {

		const subHandle = toDoApi.subscribe('toDoList', filter);

		let todoList: Array<IToDo> = [];

		if (!subHandle?.ready()) return {
			loading: true,
			todoList,
		}

		if (pathname === '/todo/personal') {
			todoList = toDoApi.find(
				{ ...filter, shared: 'Minhas Tarefas' },
				{ sort }
			).fetch();
		} else {
			todoList = toDoApi.find(
				{ ...filter, shared: 'Tarefas do Time' },
				{ sort }
			).fetch();
		}

		return {
			todoList,
			loading: false,
		};
	}, [config, pathname]);

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
			todoList,
			schema: toDoSchReduzido,
			loading,
			onChangeTextField,
			pathname,
		}),
		[todoList, loading]
	);

	return (
		<ToDoListControllerContext.Provider value={providerValues}>
			<ToDoListView />
		</ToDoListControllerContext.Provider>
	);
};

export default ToDoListController;
