import React from 'react';
import { IDefaultContainerProps } from '../../typings/BoilerplateDefaultTypings';
import { useParams } from 'react-router-dom';
import ToDoListController from './pages/toDoList/toDoListController';
import ToDoDetailController from './pages/toDoDetail/toDoDetailController';

export interface IToDoModuleContext {
	state?: string;
	id?: string;
}

export const ToDoModuleContext = React.createContext<IToDoModuleContext>({});

export default (props: IDefaultContainerProps) => {
	let { screenState, exampleId } = useParams();
	const state = screenState ?? props.screenState;
	const id = exampleId ?? props.id;

	const validState = ['view', 'edit', 'create'];

	const renderPage = () => {
		if (!state || !validState.includes(state)) return <ToDoListController />;
	};

	const providerValue = {
		state,
		id
	};
	return <ToDoModuleContext.Provider value={providerValue}>{renderPage()}</ToDoModuleContext.Provider>;
};
