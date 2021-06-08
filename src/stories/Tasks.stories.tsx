import React from 'react';
import { Story, Meta } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Task, {PropsType} from '../Task';
import {v1} from "uuid";
import {ReduxStoreProvideDecoranor} from "./ReduxStoreProvideDecoranor";
import {changeTaskStatusAC} from "../state/taskReduser";


type TaskPropsType = {
  idTodolist: string
  idTask: string
  isDone: boolean
  title: string
}

export default {
  title: 'Example/Task',
  component: Task,
  decorators: [ReduxStoreProvideDecoranor]
} as Meta;

const Template: Story<TaskPropsType> = (args) => <Task {...args} />;

export const TaskExampleDone = Template.bind({});
TaskExampleDone.args = {
  idTodolist: v1(),
  idTask: v1(),
  isDone: true,
  title: 'JS',
}
export const TaskExampleUnDone = Template.bind({});
TaskExampleUnDone.args = {
  idTodolist: v1(),
  idTask: v1(),
  isDone: false,
  title: 'JS',
}
