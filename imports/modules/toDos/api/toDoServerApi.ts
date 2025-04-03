// region Imports
import { Recurso } from '../config/recursos';
import { toDoSch, IToDo } from './toDoSch';
import { userprofileServerApi } from '../../userprofile/api/userProfileServerApi';
import { ProductServerBase } from '../../../api/productServerBase';

// endregion

class ToDoServerApi extends ProductServerBase<IToDo> {
	constructor() {
		super('toDo', toDoSch, {
			resources: Recurso
			// saveImageToDisk: true,
		});

		const self = this;

		this.addTransformedPublication(
			'toDoList',
			(filter = {}) => {
				return this.defaultListCollectionPublication(filter, {
					projection: { title: 1, description: 1, done: 1, picture: 1, createdby: 1 }
				});
			},
			async (doc: IToDo & { owner: string }) => {
				const userProfileDoc = await userprofileServerApi.getCollectionInstance().findOneAsync({ _id: doc.createdby });
				return { ...doc, owner: userProfileDoc?.username ?? 'Usuário Desconhecido' };
			}
		);

		this.addPublication('toDoDetail', (filter = {}) => {
			return this.defaultDetailCollectionPublication(filter, {});
		});
	}
}

export const toDoServerApi = new ToDoServerApi();
