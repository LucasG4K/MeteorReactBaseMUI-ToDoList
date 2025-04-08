import UserProfileContainer from '../userProfileContainer';
import { IRoute } from '../../../modules/modulesTypings';
import { UserProfileResources } from './recurso';

export const userProfileRouterList: (IRoute | null)[] = [
	{
		path: '/userprofile/:screenState/:userprofileId',
		component: UserProfileContainer,
		isProtected: true,
		resources: [UserProfileResources.USERPROFILE_VIEW]
	},
	{
		path: '/userprofile/:screenState',
		component: UserProfileContainer,
		isProtected: true,
		resources: [UserProfileResources.USERPROFILE_VIEW]
	},
	{
		path: '/userprofile',
		component: UserProfileContainer,
		isProtected: true,
		resources: [UserProfileResources.USERPROFILE_VIEW]
	}
];
