import { useTracker } from 'meteor/react-meteor-data';
import React, { createContext, useContext, useMemo } from 'react';
import { toDoApi } from '../../api/toDoApi';
import AuthContext, { IAuthContext } from '/imports/app/authProvider/authContext';
import HomeView from './homeView';
import { IToDo } from '../../api/toDoSch';


interface IHomeControllerContext {
    loading: boolean;
    toDosRecent: IToDo[];
}

export const HomeControllerContext = createContext<IHomeControllerContext>({} as IHomeControllerContext);

const HomeController = () => {

    const { user } = useContext<IAuthContext>(AuthContext);

    const { loading, toDosRecent } = useTracker(() => {
        const subHandle = toDoApi.subscribe('toDoList');

        if (!subHandle?.ready()) return {
            loading: true,
            toDosRecent: [],
        };

        const toDosRecent = toDoApi.find(
            { $or: [{ shared: 'Tarefas do Time' }, { createdby: user?._id }] },
            { sort: { createdat: -1 }, limit: 5 }
        ).fetch();

        return {
            loading: false,
            toDosRecent,
        };
    }, []);

    const providerValues: IHomeControllerContext = useMemo(() => ({
        loading,
        toDosRecent,
    }), [loading, toDosRecent])

    return (
        <HomeControllerContext.Provider value={providerValues}>
            <HomeView />
        </HomeControllerContext.Provider>
    )
}

export default HomeController;