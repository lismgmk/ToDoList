import React from 'react';
import { Story, Meta } from '@storybook/react';
import { action } from '@storybook/addon-actions';



import AddItemForm, {addItemFormType} from '../AddItemForm';
import {ReduxStoreProvideDecoranor} from "./ReduxStoreProvideDecoranor";

export default {
  title: 'Example/AddItemForm',
  component: AddItemForm,
  decorators: [ReduxStoreProvideDecoranor]
} as Meta;

const Template: Story<addItemFormType> = (args) => <AddItemForm {...args} />;

export const AddItemFormExamples = Template.bind({});
AddItemFormExamples.args = {
  addItem: action('button inside from click')
}
