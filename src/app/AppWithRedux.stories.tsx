import React from 'react';
import { Story, Meta } from '@storybook/react';
import {ReduxStoreProvideDecoranor} from "../stories/ReduxStoreProvideDecoranor";
import AppWithRedux from "./AppWithRedux";



export default {
  title: 'Example/App',
  component: AppWithRedux,
  decorators: [ReduxStoreProvideDecoranor]
} as Meta;

const Template: Story = () => <AppWithRedux />;

export const AppWithReduxExample = Template.bind({});


