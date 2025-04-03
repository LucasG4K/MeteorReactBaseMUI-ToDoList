import { IDoc } from '../../../typings/IDoc';
import { ISchema } from '../../../typings/ISchema';

export const toDoSch: ISchema<IToDo> = {
	title: {
		type: String,
		label: 'Tarefa',
		optional: false
	},
	description: {
		type: String,
		label: 'Descrição',
		optional: false
	},
	shared: {
		type: String,
		label: 'Tipo',
		defaultValue: '',
		optional: false,
		options: () => [
			{ value: 'Minhas Tarefas', label: 'Minhas Tarefas' },
			{ value: 'Tarefas do Time', label: 'Tarefas do Time' },
		]
	},
	date: {
		type: Date,
		label: 'Data da Tarefa',
		optional: true
	},
	done: {
		type: Boolean,
		label: 'Concluída',
		optional: true
	},
	picture: {
		type: String,
		label: 'Imagem',
		optional: true
	}
};

export interface IToDo extends IDoc {
	title: string;
	description: string;
	shared: string;
	date: Date;
	done: boolean;
	picture: string;
	owner: string;
}
