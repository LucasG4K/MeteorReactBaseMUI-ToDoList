import * as appStyles from '/imports/materialui/styles';

export const deleteDialogStyles = {
    box:{
        display: 'flex',
        flexDirection: 'column',
        borderRadius: appStyles.sysSizing.radiusMd,
        padding: appStyles.sysSizing.spacingFixedLg,
        gap: appStyles.sysSizing.spacingFixedLg
    },
    actions:{
        display: 'flex',
        flexDirection: 'row',
        gap: appStyles.sysSizing.spacingRemMd,
        padding: 0,
    }

}