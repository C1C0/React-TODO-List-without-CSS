/** @jsxRuntime classic */

/** @jsx jsx */
import React from "react";
import PropTypes from "prop-types";
import { jsx, css } from "@emotion/react";
import { v4 as uuidv4 } from "uuid";
import { FaTimes } from "react-icons/fa";
import {
  Container,
  CreateTodoForm,
  CreateTodoFormFieldset,
  MainTitle,
  SectionDivider,
  SectionTitle,
  TodoCheckbox,
  TodoCompleteBy,
  TodoDescription,
  TodoLi,
  TodosSection,
  TodoTextsWrapper
} from "./Helper/styledComponents";
import { ColorPalette } from "./Helper/colorPallete";

/**
 * Todos component
 * List of todos
 * Includes Todos State
 */
function Todos() {
  const [todos, setTodos] = React.useState([
    {
      id: uuidv4(),
      text: "Go to the gym",
      completed: false,
      completeBy: "Wednesday, Oct 6, 2021, 11:25 PM"
    },
    {
      id: uuidv4(),
      text: "Complete assignment",
      completed: true,
      completeBy: "Thursday, Oct 7, 2021, 11:25 PM"
    },
    {
      id: uuidv4(),
      text: "Eat healthy food",
      completed: false
    },
    {
      id: uuidv4(),
      text: "Buy flowers to mom",
      completed: true
    },
    {
      id: uuidv4(),
      text: "Visit parents",
      completed: false,
      completeBy: null
    },
    {
      id: uuidv4(),
      text: "Test",
      completed: false,
      completeBy: ""
    }
  ]);

  /**
   * Adds one TODO at the time
   *
   * @param {string} text Text displayed as comment for todo
   * @param {string} datetime Date and time of "completed by"
   */
  function addTodo(text, datetime = "") {
    let newDateTimeText = "";

    // Don't do anything, if no text provided
    if (text.length <= 0) {
      return;
    }

    // Create new todo object
    const newTodo = {
      id: uuidv4(),
      text: text,
      completed: false
    };

    // check if datetime included
    if (datetime.length > 0) {
      const newDate = new Date(datetime);

      if (newDate) {
        // get device language to display complete by in
        // more user prefered way
        let navigatorLanguage = "en-US";
        if (navigator.language) {
          navigatorLanguage = navigator.language;
        }

        // string with complete by date
        newDateTimeText = newDate.toLocaleString(navigatorLanguage, {
          weekday: "long",
          day: "numeric",
          month: "short",
          year: "numeric",
          hour: "numeric",
          minute: "2-digit"
        });

        newTodo.completeBy = newDateTimeText;
      }
    }

    setTodos([newTodo, ...todos]);
  }

  /**
   * Changes state of completed parameter of TODO item to
   * the opposite of the state before (checket -> unchecked / vice-versa)
   * @param {String} todoId
   */
  function toggleComplete(todoId) {
    setTodos(
      todos.map((todo) =>
        todo.id === todoId ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }

  /**
   * Removes the TODO from TODOs list
   * @param {String} todoId
   */
  function removeTodo(todoId) {
    setTodos(todos.filter((todo) => todo.id !== todoId));
  }

  /**
   * @returns {Todos[]}
   */
  function getUpcomingTodos() {
    return todos.filter(
      (todo) =>
        todo.completeBy !== null && todo.completeBy !== "" && todo.completeBy
    );
  }

  /**
   * @returns {Todos[]}
   */
  function getOtherTodos() {
    return todos.filter(
      (todo) =>
        todo.completeBy === null || todo.completeBy === "" || !todo.completeBy
    );
  }

  return (
    <main>
      {/* Createtodo - form */}
      <CreateTodo onCreate={addTodo} />

      <SectionDivider />

      {/* Outputting TODOs */}
      <UpcomingTodos
        upcomingTodos={getUpcomingTodos()}
        toggleComplete={toggleComplete}
        removeTodo={removeTodo}
      />

      <SectionDivider />

      <OtherTodos
        otherTodos={getOtherTodos()}
        toggleComplete={toggleComplete}
        removeTodo={removeTodo}
      />
    </main>
  );
}

/**
 * Component with upcoming todos
 */
function UpcomingTodos({ upcomingTodos, toggleComplete, removeTodo }) {
  const display = upcomingTodos.length > 0;
  return (
    <TodosSection
      backgroundColor={ColorPalette.primaryLight}
      css={css`
        display: ${display ? "block" : "none"};
      `}
    >
      <SectionTitle>Upcoming</SectionTitle>
      <ul
        css={css`
          padding-left: 0;
          margin-left: 0;
        `}
      >
        {upcomingTodos.map((todo) => (
          <Todo
            key={todo.id}
            id={todo.id}
            text={todo.text}
            completed={todo.completed}
            completeBy={todo.completeBy}
            onToggleComplete={toggleComplete}
            onRemove={removeTodo}
          />
        ))}
      </ul>
    </TodosSection>
  );
}

UpcomingTodos.propTypes = {
  upcomingTodos: PropTypes.array.isRequired,
  toggleComplete: PropTypes.func.isRequired,
  removeTodo: PropTypes.func.isRequired
};

/**
 * Component with other todos
 */
function OtherTodos({ otherTodos, toggleComplete, removeTodo }) {
  const display = otherTodos.length > 0;
  return (
    <TodosSection
      backgroundColor={ColorPalette.secondaryLight}
      css={css`
        display: ${display ? "block" : "none"};
      `}
    >
      <ul
        css={css`
          padding-left: 0;
          margin-left: 0;
        `}
      >
        {otherTodos.map((todo) => {
          return (
            <Todo
              key={todo.id}
              id={todo.id}
              text={todo.text}
              completed={todo.completed}
              onToggleComplete={toggleComplete}
              onRemove={removeTodo}
            />
          );
        })}
      </ul>
    </TodosSection>
  );
}
OtherTodos.propTypes = {
  otherTodos: PropTypes.array.isRequired,
  toggleComplete: PropTypes.func.isRequired,
  removeTodo: PropTypes.func.isRequired
};

/**
 * TODO component
 */
function Todo({ id, text, completed, completeBy, onRemove, onToggleComplete }) {
  const textColor = completeBy
    ? ColorPalette.primaryDark
    : ColorPalette.secondaryDark;

  return (
    <TodoLi>
      <TodoCheckbox
        type="checkbox"
        checked={completed}
        onChange={() => onToggleComplete(id)}
      />

      <TodoTextsWrapper>
        <TodoDescription color={textColor}>{text}</TodoDescription>
        <TodoCompleteBy>{completeBy}</TodoCompleteBy>
      </TodoTextsWrapper>

      <FaTimes
        onClick={() => onRemove(id)}
        color={textColor}
        css={css`
          cursor: pointer;
        `}
      />
    </TodoLi>
  );
}
Todo.propTypes = {
  id: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
  completeBy: PropTypes.string,
  onRemove: PropTypes.func.isRequired,
  onToggleComplete: PropTypes.func.isRequired
};

/**
 * Manages Form for adding TODOs
 */
function CreateTodo({ onCreate }) {
  /**
   * Handles submission of create todo form
   * @param event
   */
  function handleOnSubmit(event) {
    event.preventDefault();

    // get new todo text
    const form = event.target;
    const todoTextInput = form.querySelector('input[type="text"]');
    const todoText = todoTextInput?.value || "";

    // to prevent losing already prepared data
    if (todoText === 0) {
      return;
    }

    // get new todo datetime-local
    const todoDatetimeInput = form.querySelector(
      'input[type="datetime-local"]'
    );
    const todoDatetime = todoDatetimeInput?.value || "";

    onCreate(todoText, todoDatetime);

    // reset values
    todoTextInput.value = "";
    todoDatetimeInput.value = "";
  }

  return (
    <CreateTodoForm onSubmit={(e) => handleOnSubmit(e)}>
      <CreateTodoFormFieldset>
        <input
          type="text"
          placeholder="Todo's description"
          css={css`
            flex: 1;
            margin-right: 10px;
          `}
        />
        <input type="submit" value="Add" />
      </CreateTodoFormFieldset>
      <CreateTodoFormFieldset flexOption="column">
        <label htmlFor="datetime">Complete by date and time</label>
        <input
          type="datetime-local"
          name="datetime"
          id="datetime"
          css={css`
            width: 100%;
          `}
        />
      </CreateTodoFormFieldset>
    </CreateTodoForm>
  );
}
CreateTodo.propTypes = {
  onCreate: PropTypes.func.isRequired
};

export default function App() {
  return (
    <div className="App">
      <Container>
        <MainTitle>
          To-Do <span>list organizer</span>
        </MainTitle>
        <Todos />
      </Container>
    </div>
  );
}
