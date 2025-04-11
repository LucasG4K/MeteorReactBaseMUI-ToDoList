import React, { useState, useContext } from 'react';
import { IToDo } from "../api/toDoSch"
import { ToDoListControllerContext } from '../pages/toDoList/toDoListController';
import DeleteDialog from '/imports/ui/appComponents/showDialog/custom/deleteDialog/deleteDialog';
import AppLayoutContext from '/imports/app/appLayoutProvider/appLayoutContext';
import SysIcon from '/imports/ui/components/sysIcon/sysIcon';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { MoreVertOutlined, RadioButtonUncheckedOutlined, TaskAltOutlined } from '@mui/icons-material';
import AuthContext from '/imports/app/authProvider/authContext';

interface ISysTaskCard {
    task: IToDo;
    onClick?: () => void | undefined;
}

const SysTaskCard = ({ task, onClick }: ISysTaskCard) => {

    const sysLayoutContext = useContext(AppLayoutContext)
    const controller = useContext(ToDoListControllerContext);
    const { onEditButtonClick, onDeleteButtonClick, onCheckButtonClick } = controller;
    const { user } = useContext(AuthContext);

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <ListItem
                disablePadding
                divider={true}
                secondaryAction={
                    <>
                        <Tooltip title="Mais">
                            <IconButton onClick={handleMenuOpen}>
                                <MoreVertOutlined />
                            </IconButton>
                        </Tooltip>
                        <Menu anchorEl={anchorEl} open={open} onClose={handleMenuClose}>

                            <MenuItem
                                onClick={() => {
                                    onEditButtonClick(task._id);
                                    handleMenuClose();
                                }}>
                                <SysIcon name={'edit'} /> Editar
                            </MenuItem>

                            <MenuItem
                                disabled={task.createdby !== user?._id}
                                onClick={() => {
                                    DeleteDialog({
                                        showDialog: sysLayoutContext.showDialog,
                                        closeDialog: sysLayoutContext.closeDialog,
                                        title: `Excluir tarefa ${task.title}`,
                                        message: `Tem certeza que deseja excluir a tarefa ${task.title}?`,
                                        onDeleteConfirm: () => {
                                            onDeleteButtonClick(task);
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
                }>
                <ListItemButton
                    onClick={onClick}
                    disableRipple={!!!onclick}
                    sx={{
                        cursor: !!onClick ? 'pointer' : 'default',
                        '&:hover': {
                            backgroundColor: !!onClick ? 'rgba(0,0,0,0.04)' : 'transparent',
                        },
                    }}
                >
                    <ListItemIcon>
                        <Checkbox
                            edge='start'
                            checked={task.done}
                            icon={<RadioButtonUncheckedOutlined />}
                            checkedIcon={<TaskAltOutlined />}
                            onClick={(event) => event.stopPropagation()}
                            onChange={(event) => onCheckButtonClick({ ...task, done: event.target.checked })}
                        />
                    </ListItemIcon>
                    <ListItemText
                        id={task._id}
                        primary={
                            <Typography variant='body1' sx={{ fontWeight: '600', textDecoration: task.done ? "line-through" : 'none' }}>
                                {task.title}
                            </Typography>
                        }
                        secondary={
                            <Typography
                                variant='body2'
                                noWrap
                                sx={{ textOverflow: 'ellipsis', overflow: 'hidden' }}>
                                {`Criada por: `}
                                <Typography sx={{ display: 'inline', textDecorationLine: 'underline' }}>
                                    {task.owner}
                                </Typography>
                                {task.description ? ` - ${task.description}` : ''}
                            </Typography>
                        }
                    />
                </ListItemButton>
            </ListItem>
        </>
    )
}

export { SysTaskCard };