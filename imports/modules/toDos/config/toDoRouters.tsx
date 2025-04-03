import ToDoContainer from '../toDoContainer';
import { Recurso } from './recursos';
import { IRoute } from '../../modulesTypings';

export const toDoRouterList: (IRoute | null)[] = [
	{
		path: '/todo/:screenState/:todoId',
		component: ToDoContainer,
		isProtected: true,
		resources: [Recurso.TODO_VIEW]
	},
	{
		path: '/todo/:screenState',
		component: ToDoContainer,
		isProtected: true,
		resources: [Recurso.TODO_CREATE]
	},
	{
		path: '/todo',
		component: ToDoContainer,
		isProtected: true,
		resources: [Recurso.TODO_VIEW]
	}
];
