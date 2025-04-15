import React, { useContext } from 'react';
import { IToDo } from "../api/toDoSch"
import Checkbox from '@mui/material/Checkbox';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import { RadioButtonUncheckedOutlined, TaskAltOutlined } from '@mui/icons-material';
import AuthContext from '/imports/app/authProvider/authContext';
import { ToDoModuleContext } from '../toDoContainer';
import { SysTaskMoreOptions } from './SysTaskMoreOptions';

interface ISysTaskCard {
    task: IToDo;
    onClick?: () => void | undefined;
}

const SysTaskCard = ({ task, onClick }: ISysTaskCard) => {

    const { onCheckButtonClick } = useContext(ToDoModuleContext);;
    const { user } = useContext(AuthContext);

    return (
        <>
            <ListItem
                disablePadding
                divider={true}
                secondaryAction={
                    <SysTaskMoreOptions
                        task={task}
                        deleteDisabled={task.createdby !== user?._id} />
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
                            onChange={(event) => onCheckButtonClick!({ ...task, done: event.target.checked })}
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