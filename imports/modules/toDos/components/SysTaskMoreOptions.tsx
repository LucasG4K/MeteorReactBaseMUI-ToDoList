import { MoreVertOutlined } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';
import React, { useContext, useState } from 'react';
import SysIcon from '/imports/ui/components/sysIcon/sysIcon';
import DeleteDialog from '/imports/ui/appComponents/showDialog/custom/deleteDialog/deleteDialog';
import { IToDo } from '../api/toDoSch';
import AppLayoutContext, { IAppLayoutContext } from '/imports/app/appLayoutProvider/appLayoutContext';
import { IToDoModuleContext, ToDoModuleContext } from '../toDoContainer';

interface ISysTaskMoreOptions {
    task: IToDo;
    deleteDisabled: boolean;
    onDelete?: () => void | undefined;
}

const SysTaskMoreOptions: React.FC<ISysTaskMoreOptions> = ({ task, deleteDisabled, onDelete }) => {

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const sysLayoutContext = useContext<IAppLayoutContext>(AppLayoutContext)

    const { onEditButtonClick, onDeleteButtonClick } = useContext<IToDoModuleContext>(ToDoModuleContext);

    return (
        <>
            <Tooltip title="Mais">
                <IconButton onClick={handleMenuOpen}>
                    <MoreVertOutlined />
                </IconButton>
            </Tooltip>
            <Menu anchorEl={anchorEl} open={open} onClose={handleMenuClose}>

                <MenuItem
                    onClick={() => {
                        onEditButtonClick!(task._id!);
                        handleMenuClose();
                    }}>
                    <SysIcon name={'edit'} /> Editar
                </MenuItem>

                <MenuItem
                    disabled={deleteDisabled}
                    onClick={() => {
                        DeleteDialog({
                            showDialog: sysLayoutContext.showDialog,
                            closeDialog: sysLayoutContext.closeDialog,
                            title: `Excluir tarefa ${task.title}`,
                            message: `Tem certeza que deseja excluir a tarefa ${task.title}?`,
                            onDeleteConfirm: () => {
                                onDelete!();
                                onDeleteButtonClick!(task);
                                sysLayoutContext.showNotification({
                                    message: 'Excluído com sucesso!'
                                });
                            }
                        });
                        handleMenuClose();
                    }}>
                    <SysIcon color={'error'} name={'delete'} /> Deletar
                </MenuItem>

            </Menu>
        </>
    );
}

export { SysTaskMoreOptions }