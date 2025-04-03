import React, { useState } from 'react';
import { IToDo } from "../api/toDoSch"
import { Checkbox, Divider, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Menu, MenuItem, Tooltip, Typography } from '@mui/material';
import { DeleteOutlineOutlined, EditOutlined, MoreVertOutlined, RadioButtonUncheckedOutlined, TaskAltOutlined } from '@mui/icons-material';
import ToDoListController, { ToDoListControllerContext } from '../pages/toDoList/toDoListController';
import DeleteDialog from '/imports/ui/appComponents/showDialog/custom/deleteDialog/deleteDialog';
import AppLayoutContext from '/imports/app/appLayoutProvider/appLayoutContext';

interface ISysTaskCard {
    task: IToDo;
}

const SysTaskCard = ({ task }: ISysTaskCard) => {

    const sysLayoutContext = React.useContext(AppLayoutContext)
    const controller = React.useContext(ToDoListControllerContext);
    const { onEditButtonClick, onDeleteButtonClick, onCheckButtonClick } = controller;

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
                secondaryAction={
                    <>
                        <Tooltip title="Mais">
                            <IconButton onClick={handleMenuOpen}>
                                <MoreVertOutlined />
                            </IconButton>
                        </Tooltip>
                        <Menu anchorEl={anchorEl} open={open} onClose={handleMenuClose}>
                            <MenuItem onClick={() => {
                                handleMenuClose;
                                onEditButtonClick(task._id);
                            }}>
                                <EditOutlined /> Editar
                            </MenuItem>
                            <MenuItem onClick={() => {
                                handleMenuClose;
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
                            }}>
                                <DeleteOutlineOutlined /> Deletar
                            </MenuItem>
                        </Menu>
                    </>
                }
            >
                <ListItemButton>
                    <ListItemIcon>
                        <Checkbox
                            edge='start'
                            checked={task.done}
                            icon={<RadioButtonUncheckedOutlined />}
                            checkedIcon={<TaskAltOutlined />}
                            onClick={() => console.log(task)}
                            onChange={(event) => onCheckButtonClick({ ...task, done: event.target.checked })}
                        />
                    </ListItemIcon>
                    <ListItemText
                        id={task._id}
                        primary={task.done ? <s>{task.title}</s> : task.title}
                        secondary={
                            <>
                                {`Criada por: `}
                                <Typography
                                    variant='body2'
                                    component='span'
                                    sx={{ display: 'inline', textDecorationLine: 'underline' }}
                                >
                                    {task.owner}
                                </Typography>
                                {task.description ? ` - ${task.description}` : ''}
                            </>
                        }
                    />
                </ListItemButton>
            </ListItem>
            <Divider />
        </>
    )
}

export { SysTaskCard };