type StateType = {
  age: number;
  childrenCount: number;
  name: string;
};

type ActionType = {
  type: string;
  [key: string]: string;
};

export const userReducer = (
  state: StateType,
  action: ActionType
): StateType => {
  switch (action.type) {
    case "INCREMENT_AGE":
      return { ...state, age: state.age + 1 };

    case "INCREMENT_CHILDREN-COUNT":
      return { ...state, childrenCount: state.childrenCount + 1 };

    case "CHANGE-NAME":
      return { ...state, name: action.newName };
    default:
      throw new Error("i dont understand this action type");
  }
};
