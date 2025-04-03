import { IAppMenu, IModuleHub, IRoute } from './modulesTypings';
import Example from './example/config';
import UserProfile from './userprofile/config';
import ToDo from './toDos/config';

const pages: Array<IRoute | null> = [
	...Example.pagesRouterList, 
	...UserProfile.pagesRouterList,
	...ToDo.pagesRouterList,
];

const menuItens: Array<IAppMenu | null> = [
	...Example.pagesMenuItemList, 
	...UserProfile.pagesMenuItemList,
	...ToDo.pagesMenuItemList,
];

const Modules: IModuleHub = {
	pagesMenuItemList: menuItens,
	pagesRouterList: pages
};

export default Modules;
