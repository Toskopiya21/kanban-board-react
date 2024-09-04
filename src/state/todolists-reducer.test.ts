import {
    addTodoListAC,
    changeTodoListTitleAC,
    // ChangeTodoListTitleActionType,
    removeTodoListAC,
    todolistsReducer,
} from "./todolists-reducer";
import {v1} from "uuid";
import {TodolistType} from "./../AppWithRedux";

test("correct todolist should be removed", () => {
    const todoListId1 = v1();
    const todoListId2 = v1();
    const startState: Array<TodolistType> = [
        {id: todoListId1, title: "Задачи"},
        {id: todoListId2, title: "В работе"},
    ];
    const endState = todolistsReducer(startState, removeTodoListAC(todoListId1));

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todoListId2);
});

test("correct todolist should be added", () => {
    const todoListId1 = v1();
    const todoListId2 = v1();
    const newTodoListTitle = "Ожидает проверки";

    const startState: Array<TodolistType> = [
        {id: todoListId1, title: "Задачи"},
        {id: todoListId2, title: "В работе"},
    ];
    const endState = todolistsReducer(
        startState,
        addTodoListAC(newTodoListTitle)
    );

    expect(endState.length).toBe(3);
    expect(endState[2].title).toBe(newTodoListTitle);
});

test("correct todolist should change its name", () => {
    const todoListId1 = v1();
    const todoListId2 = v1();

    const newTodoListTitle = "Ожидает проверки";

    const startState: Array<TodolistType> = [
        {id: todoListId1, title: "Задачи"},
        {id: todoListId2, title: "В работе"},
    ];

    // const action = {
    //   type: "CHANGE_TODOLIST_TITLE" as const,
    //...
    // };
    // or
    // const action: ChangeTodoListTitleActionType = {
    // ...
    // };
    const endState = todolistsReducer(
        startState,
        changeTodoListTitleAC(todoListId1, newTodoListTitle)
    );

    expect(endState[0].title).toBe(newTodoListTitle);
    expect(endState[1].title).toBe("В работе");
});
