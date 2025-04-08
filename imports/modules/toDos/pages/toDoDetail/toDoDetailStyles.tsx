import { ElementType } from 'react';
import Box, { BoxProps } from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import { sysSizing } from '../../../../ui/materialui/styles';

interface IToDoDetailStyles {
	Frame: ElementType<BoxProps>;
	LoadingContainer: ElementType<BoxProps>;
	FieldsForm: ElementType<BoxProps>;
	Actions: ElementType<BoxProps>;
}

const ToDoDetailStyles: IToDoDetailStyles = {
	Frame: styled(Box)(() => ({
		// height: '600px',
		width: '540px',
		display: 'flex',
		flexDirection: 'column',
		gap: sysSizing.spacingFixedLg,
		padding: sysSizing.spacingFixedLg,
		justifyContent: 'space-evenly',
	})),
	LoadingContainer: styled(Box)(({ theme }) => ({
		width: '100%',
		display: 'flex',
		flexGrow: 1,
		justifyContent: 'center',
		alignItems: 'center',
		flexDirection: 'column',
		gap: theme.spacing(2)
	})),
	FieldsForm: styled(Box)(() => ({
		height: '100%',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'space-evenly',
		gap: sysSizing.spacingFixedMd,
	})),
	Actions: styled(Box)(() => ({
		display: 'flex',
		flexDirection: 'row',
		gap: sysSizing.spacingRemMd,
		padding: 0,
		justifyContent: 'flex-end'
	}))
};

export default ToDoDetailStyles;
