import { toDoRouterList } from './toDoRouters';
import { toDoMenuItemList } from './toDoAppMenu';
import { IModuleHub } from '../../modulesTypings';

const ToDo: IModuleHub = {
	pagesRouterList: toDoRouterList,
	pagesMenuItemList: toDoMenuItemList
};

export default ToDo;
