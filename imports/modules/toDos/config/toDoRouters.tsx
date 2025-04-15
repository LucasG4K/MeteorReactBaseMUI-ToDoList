import ToDoContainer from '../toDoContainer';
import { ToDoResources } from './recursos';
import { IRoute } from '../../modulesTypings';

export const toDoRouterList: (IRoute | null)[] = [
	// {
	// 	path: '/todo/:screenState/:todoId',
	// 	component: ToDoContainer,
	// 	isProtected: true,
	// 	resources: [ToDoResources.TODO_VIEW]
	// },
	// {
	// 	path: '/todo/:screenState',
	// 	component: ToDoContainer,
	// 	isProtected: true,
	// 	resources: [ToDoResources.TODO_CREATE]
	// },
	{
		path: '/',
		exact: true,
		component: ToDoContainer,
		isProtected: true,
		resources: [ToDoResources.TODO_VIEW]
	},
	{
		path: '/todo/personal',
		component: ToDoContainer,
		isProtected: true,
		resources: [ToDoResources.TODO_VIEW]
	},
	{
		path: '/todo/group',
		component: ToDoContainer,
		isProtected: true,
		resources: [ToDoResources.TODO_VIEW]
	}
];
