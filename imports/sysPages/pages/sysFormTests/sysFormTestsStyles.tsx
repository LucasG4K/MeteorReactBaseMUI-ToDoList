import React, {ElementType} from "react";
import { styled, Box, BoxProps, Paper, PaperProps } from "@mui/material";
import { sysSizing } from "/imports/ui/materialui/styles";

interface ISysFormTestsStyles {
    container: ElementType<BoxProps>;
    header: ElementType<BoxProps>;
    schemaAndValues: ElementType<BoxProps>;
    controllersContainer: ElementType<BoxProps>;
    sysFormContainer: ElementType<BoxProps>;
}

const SysFormTestsStyles: ISysFormTestsStyles = {
    container: styled(Box)({
        display: 'flex',
        flexDirection: 'column',
        padding: `${sysSizing.contentPt} ${sysSizing.contentPx}`,
        gap: '1rem',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',    
    }),
    header: styled(Box)({
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        marginBottom: '1rem',
    }),
    schemaAndValues: styled(Box)({
        display: 'flex',
        flexDirection: 'row',
        gap: '1rem',
        width: '100%',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
    }),
    controllersContainer: styled(Box)({
        display: 'flex',
        flexDirection: 'row',
        gap: '1rem',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
    }),
    sysFormContainer: styled(Box)({
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        width: '100%',
    }),
};

export default SysFormTestsStyles;