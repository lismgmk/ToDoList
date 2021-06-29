import React from 'react';
import { Story, Meta } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Task from '../features/todoListsList/todoList/task/Task';
import {v1} from "uuid";
import {ReduxStoreProvideDecoranor} from "./ReduxStoreProvideDecoranor";
import {TaskPriorities, TaskStatuses} from "../api/todolist-api";





export default {
  title: 'Example/Task',
  component: Task,
  decorators: [ReduxStoreProvideDecoranor]
} as Meta;

export const TaskBaseExample = (props: any) => {
  return(
      <>
      <Task
          idTodolist={'1'}
          task={{id: v1(), title: "Milk",
            description: '',
            completed: true,
            status: TaskStatuses.Completed,
            priority: TaskPriorities.Hi,
            deadline: '',
            todoListId: '1',
            order: 1,
            addedDate: '',
            startDate: '',
              entityTaskStatus: 'succeeded'
          }}
          chahgeTaskStatus={action('change status')}
          chahgeTaskTitle={action('change status')}
          removeTask={action('change status')}
      />
      <Task
          idTodolist={'2'}
          task={{id: v1(), title: "Beer",
            description: '',
            completed: true,
            status: TaskStatuses.Completed,
            priority: TaskPriorities.Hi,
            deadline: '',
            todoListId: '2',
            order: 1,
            addedDate: '',
            startDate: '',
              entityTaskStatus: 'succeeded'
          }}
          chahgeTaskStatus={action('change status')}
          chahgeTaskTitle={action('change status')}
          removeTask={action('change status')}
      />
      </>
  )
}
