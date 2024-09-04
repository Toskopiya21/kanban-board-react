import React from 'react';
import {Provider} from 'react-redux';
import {Task} from './Task';
import {store} from "./state/store.ts";

export default {
    title: 'Task',
    component: Task,
};

const Template = () => (
    <Provider store={store}>
        {/*<Task task={"1", "string",isDone: false} todoListId="1"/>*/}
        <Task task={{id: "1", title: "string", isDone: true}} todoListId="1"/>
        <Task task={{id: "2", title: "vrvrv", isDone: false}} todoListId="2"/>
    </Provider>
);

export const Default = Template.bind({});
// Default.args = {
//     // ваши пропсы
//     task: {id: "1", title: "string", isDone: false},
//     todoListId: "1"
// };
``
// import {Task} from "./Task.tsx";
//
// import type {Meta, StoryObj} from '@storybook/react';
// // import {fn} from "@storybook/test";
// // import {action} from '@storybook/addon-actions';
//
// // const callback = action("Input Value")
// const meta: Meta<typeof Task> = {
//     component: Task,
//     args:
//         {
//             task: {id: "1", title: "string", isDone: false},
//             todoListId: "1"
//         }
// }
//
// export default meta;
// type Story = StoryObj<typeof Task>;
//
// export const TaskBaseExample: Story = {
//     args: {
//         // title: "Input"
//     },
// };
