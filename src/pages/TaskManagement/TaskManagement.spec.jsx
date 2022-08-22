import React from 'react';
import {render, fireEvent, waitFor, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import TaskManagement from './TaskManagement';
import * as hooks from "../../hooks/useTasks";
import { mockTasks } from '../../mocks/mockData/mockTasks';

describe("tests for task management", ()=>{



    test("the title displays my tasks", ()=>{
        render(<TaskManagement/>)
        expect(screen.getByText("My Tasks")).toBeInTheDocument();
    });

    test("expect cards to be visible when loaded", ()=>{
        const mockDispatch = jest.fn();
        jest.spyOn(hooks, 'useTasks').mockImplementation(()=>{return(
                    {tasks:mockTasks,
                    dispatch:mockDispatch,
                    loadingStatus:"loaded" })});
        render(<TaskManagement/>)
        expect(screen.queryAllByTestId("task-card")[0]).toBeInTheDocument();
    })

    test("expect loader to be visible when task are loading", ()=>{
        const mockDispatch = jest.fn();
        jest.spyOn(hooks, 'useTasks').mockImplementation(()=>{return(
                    {tasks:mockTasks,
                    dispatch:mockDispatch,
                    loadingStatus:"loading" })});
        render(<TaskManagement/>)
        expect(screen.getByTestId("tasks-loader")).toBeVisible();
    })
})