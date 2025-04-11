import React from 'react';
import { IDefaultContainerProps } from '../../typings/BoilerplateDefaultTypings';
import { useLocation, useParams } from 'react-router-dom';
import ToDoListController from './pages/toDoList/toDoListController';
import ToDoDetailController from './pages/toDoDetail/toDoDetailController';
import ToDoListView from './pages/toDoList/toDoListView';

export interface IToDoModuleContext {
	state?: string;
	id?: string;
	pathname?: string;
}

export const ToDoModuleContext = React.createContext<IToDoModuleContext>({});

export default (props: IDefaultContainerProps) => {
	const { screenState, exampleId } = useParams();
	const { pathname } = useLocation();
	const state = screenState ?? props.screenState;
	const id = exampleId ?? props.id;

	const validState = ['view', 'edit', 'create'];

	const renderPage = () => {
		if (!state || !validState.includes(state))
			return <ToDoListController><ToDoListView /></ToDoListController>;
	};

	const providerValue = {
		state,
		id,
		pathname
	};

	return <ToDoModuleContext.Provider value={providerValue}>{renderPage()}</ToDoModuleContext.Provider>;
};
