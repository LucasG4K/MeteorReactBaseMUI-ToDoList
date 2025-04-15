import React, { useCallback, useContext } from 'react';
import { IDefaultContainerProps } from '../../typings/BoilerplateDefaultTypings';
import { useLocation, useParams } from 'react-router-dom';
import ToDoListController from './pages/toDoList/toDoListController';
import HomeController from './pages/home/homeController';
import { sysSizing } from '/imports/ui/materialui/styles';
import ToDoDetailController from './pages/toDoDetail/toDoDetailController';
import { toDoApi } from './api/toDoApi';
import AppLayoutContext, { IAppLayoutContext } from '/imports/app/appLayoutProvider/appLayoutContext';
import { IToDo } from './api/toDoSch';

export interface IToDoModuleContext {
	state?: string;
	id?: string;
	pathname?: string;
	onEditButtonClick?: (id: string) => void;
	onCheckButtonClick?: (task: IToDo) => void;
	onDeleteButtonClick?: (task: IToDo) => void;
}

export const ToDoModuleContext = React.createContext<IToDoModuleContext>({} as IToDoModuleContext);

export default (props: IDefaultContainerProps) => {
	const { screenState, exampleId } = useParams();
	const { pathname } = useLocation();
	const state = screenState ?? props.screenState;
	const id = exampleId ?? props.id;

	const { showDialog } = useContext<IAppLayoutContext>(AppLayoutContext);

	// const validState = ['view', 'edit', 'create'];

	const onEditButtonClick = useCallback((id: string) => {
		showDialog({
			sx: { borderRadius: sysSizing.radiusMd },
			children: <ToDoDetailController id={id} mode="edit" />
		});
	}, []);

	const onCheckButtonClick = useCallback((task: IToDo) => {
		toDoApi.update(task);
	}, []);

	const onDeleteButtonClick = useCallback((task: IToDo) => {
		toDoApi.remove(task);
	}, []);

	const renderPage = () => {
		if (pathname === '/')
			return <HomeController />
		else
			return <ToDoListController />
	};

	const providerValue = {
		state,
		id,
		pathname,
		onEditButtonClick,
		onCheckButtonClick,
		onDeleteButtonClick
	};

	return <ToDoModuleContext.Provider value={providerValue}>{renderPage()}</ToDoModuleContext.Provider>;
};

