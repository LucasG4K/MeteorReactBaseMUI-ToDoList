import React, { useState } from 'react';
import { IToDo } from "../api/toDoSch"
import { Checkbox, Divider, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Menu, MenuItem, Tooltip, Typography } from '@mui/material';
import { DeleteOutlineOutlined, EditOutlined, MoreVertOutlined } from '@mui/icons-material';


interface ISysTaskCard {
    task: IToDo;

}

const SysTaskCard = ({ task }: ISysTaskCard) => {

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
                key={task._id}
                disablePadding
                secondaryAction={
                    <>
                        <Tooltip title="Mais">
                            <IconButton onClick={handleMenuOpen}>
                                <MoreVertOutlined />
                            </IconButton>
                        </Tooltip>
                        <Menu anchorEl={anchorEl} open={open} onClose={handleMenuClose}>
                            <MenuItem onClick={handleMenuClose}>
                                <EditOutlined /> Editar
                            </MenuItem>
                            <MenuItem onClick={handleMenuClose}>
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
                            tabIndex={-1}
                            disableRipple
                        />
                    </ListItemIcon>
                    <ListItemText
                        id={task._id}
                        primary={task.title}
                        secondary={
                            <>
                                <Typography
                                    variant='body2'
                                    component='span'
                                    sx={{ display: 'inline' }}
                                >
                                    {`Criada por: ${task.owner}`}
                                </Typography>
                                {` - ${task.description}`}
                            </>
                        }
                    />
                </ListItemButton>
                <Divider />
            </ListItem>
        </>
    )
}

export { SysTaskCard };