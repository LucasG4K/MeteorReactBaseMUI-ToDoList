import React from 'react';
import { IAppMenu } from '../../modulesTypings';
import SysIcon from '../../../ui/components/sysIcon/sysIcon';

export const toDoMenuItemList: (IAppMenu | null)[] = [
	{
		path: '/',
		name: 'Início',
		icon: <SysIcon name={'home'} />
	},
	{
		path: `/todo`,
		name: 'ToDo',
		icon: <SysIcon name={'task'} />
	},
];
