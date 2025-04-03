import React from 'react';
import { IAppMenu } from '../../modulesTypings';
import SysIcon from '../../../ui/components/sysIcon/sysIcon';

export const toDoMenuItemList: (IAppMenu | null)[] = [
	{
		path: '/todo',
		name: 'ToDo',
		icon: <SysIcon name={'task'} />
	}
];
