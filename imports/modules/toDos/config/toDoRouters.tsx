import ToDoContainer from '../toDoContainer';
import { ToDoResources } from './recursos';
import { IRoute } from '../../modulesTypings';

export const toDoRouterList: (IRoute | null)[] = [
	{
		path: '/',
		exact: true,
		component: ToDoContainer,
		isProtected: true,
		resources: [ToDoResources.TODO_VIEW]
	},
	{
		path: '/todo',
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
