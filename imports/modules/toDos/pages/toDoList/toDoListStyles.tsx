import { ElementType } from 'react';
import { styled } from '@mui/material/styles';
import Box, { BoxProps } from '@mui/material/Box';
import { sysSizing } from '../../../../ui/materialui/styles';
import { SysSectionPaddingXY } from '../../../../ui/layoutComponents/sysLayoutComponents';
import Grid, { GridProps } from '@mui/material/Grid';


interface IToDoListStyles {
	Container: ElementType<BoxProps>;
	LoadingContainer: ElementType<BoxProps>;
	SearchContainer: ElementType<BoxProps>;
	TaskStatus: ElementType<GridProps>;
	TabView: ElementType<BoxProps>;
}

const ToDoListStyles: IToDoListStyles = {
	Container: styled(SysSectionPaddingXY)(() => ({
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'flex-start',
		alignItems: 'flex-start',
		width: '100%',
		height: '100vh',
		overflow: 'auto',
		gap: sysSizing.spacingFixedMd,
		marginBottom: sysSizing.contentFabDistance
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
	SearchContainer: styled(Box)(({ theme }) => ({
		width: '100%',
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: 'flex-end',
		maxWidth: '616px',
		gap: sysSizing.spacingFixedMd,
		[theme.breakpoints.down('sm')]: {
			flexDirection: 'column'
		}
	})),
	TaskStatus: styled(Grid)(({theme}) => ({
		marginTop: sysSizing.spacingFixedMd
	})),
	TabView: styled(Box)(({ theme }) => ({
		width: '100%',
		marginBottom: sysSizing.spacingFixedMd
	}))
};

export default ToDoListStyles;
