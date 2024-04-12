import React, { useRef, useReducer } from "react";

import "../styles/ToDoList.css";
import Header from "../components/Header";
import TodoEditor from "../components/TodoEditor";
import TodoListCmp from "../components/TodoListCmp";

const mockTodo = [
  // {
  //   id: 0,
  //   isDone: false,
  //   content: "React 공부하기",
  //   createdDate: new Date().getTime(),
  // },
  // {
  //   id: 1,
  //   isDone: false,
  //   content: "책 읽기",
  //   createdDate: new Date().getTime(),
  // },
  // {
  //   id: 2,
  //   isDone: false,
  //   content: "블로그 업로드 하기",
  //   createdDate: new Date().getTime(),
  // },
];

const reducer = (state, action) => {
  switch (action.type) {
    case "CREATE": {
      return [action.newItem, ...state];
    }
    case "UPDATE": {
      return state.map((it) =>
        it.id === action.targetId
          ? {
              ...it,
              isDone: !it.isDone,
            }
          : it
      );
    }
    case "DELETE": {
      return state.filter((it) => it.id !== action.targetId);
    }
    default:
      return state;
  }
};

const ToDoList = () => {
  const [todo, dispatch] = useReducer(reducer, mockTodo);
  const idRef = useRef(0);

  const onCreate = (content) => {
    dispatch({
      type: "CREATE",
      newItem: {
        id: idRef.current,
        content,
        isDone: false,
        createdDate: new Date().getTime(),
      },
    });
    idRef.current += 1;
  };

  const onUpdate = (targetId) => {
    dispatch({
      type: "UPDATE",
      targetId,
    });
  };

  const onDelete = (targetId) => {
    dispatch({
      type: "DELETE",
      targetId,
    });
  };

  return (
    <div className="ToDoList">
      <Header />
      <TodoEditor onCreate={onCreate} />
      <TodoListCmp todo={todo} onUpdate={onUpdate} onDelete={onDelete} />
    </div>
  );
};

export default ToDoList;
