import { IAppMenu, IModuleHub, IRoute } from './modulesTypings';
import UserProfile from './userprofile/config';
import ToDo from './toDos/config';

const pages: Array<IRoute | null> = [
	...ToDo.pagesRouterList,
	...UserProfile.pagesRouterList,
];

const menuItens: Array<IAppMenu | null> = [
	...ToDo.pagesMenuItemList,
	...UserProfile.pagesMenuItemList,
];

const Modules: IModuleHub = {
	pagesMenuItemList: menuItens,
	pagesRouterList: pages
};

export default Modules;
