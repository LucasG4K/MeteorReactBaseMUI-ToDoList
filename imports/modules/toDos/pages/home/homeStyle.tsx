import { ElementType } from 'react';
import { styled } from '@mui/material/styles';
import Box, { BoxProps } from '@mui/material/Box';
import { SysSectionPaddingXY } from "/imports/ui/layoutComponents/sysLayoutComponents";

interface IHomeStyles {
	Container: ElementType<BoxProps>;
	Header: ElementType<BoxProps>;
	RowButtons: ElementType<BoxProps>;
	LoadingContainer: ElementType<BoxProps>;
}

const HomeStyles: IHomeStyles = {
	Container: styled(SysSectionPaddingXY)(() => ({
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'flex-start',
		justifyContent: 'flex-start',
		gap: '2.5rem',
		width: '100%',
		height: '100%',
	})),
	Header: styled(Box)(({ }) => ({
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'flex-start',
		justifyContent: 'flex-start',
		gap: '1rem',
		marginBottom: '1rem'
	})),
	RowButtons: styled(Box)(({ theme }) => ({
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'flex-start',
		gap: '0.5rem',
		flexWrap: 'wrap',
		rowGap: '0.8rem',
		[theme.breakpoints.down('lg')]: {
			justifyContent: 'space-around'
		},
		[theme.breakpoints.down('sm')]: {
			columnGap: '1rem'
		}
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
};

export default HomeStyles;
