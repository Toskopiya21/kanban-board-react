
import {AddItemForm} from "./AddItemForm.tsx";

import type { Meta, StoryObj } from '@storybook/react';
// import {fn} from "@storybook/test";
import { action } from '@storybook/addon-actions';

const callback = action("Input Value")
const meta: Meta<typeof AddItemForm> = {
  component: AddItemForm,
  args: {
    title: "Input",
    addItem: callback,
  },
};

export default meta;
type Story = StoryObj<typeof AddItemForm>;

export const AddItemFormBase: Story = {
  args: {
    // title: "Input"
  },
};
