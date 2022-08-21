import { tasksReducer } from "./tasksReducer.js";
import { mockTasks } from "../mocks/mockData/mockTasks";
import { cleanup } from "@testing-library/react";

describe("tests for tasks reducer", () => {
  afterEach(() => {
    cleanup();
  });
  test("default returns all tasks", () => {
    const testInput = mockTasks;
    const testAction = {
      type: "",
    };
    const reducerOutput = tasksReducer(testInput, testAction);
    expect(reducerOutput).toStrictEqual(testInput);
  });

  test("mark done will set a tasks completed property to true", () => {
    const testInput = mockTasks;
    testInput[0].completed = false;
    const testIncompleteTask = testInput[0];
    expect(testIncompleteTask.completed).toBeFalsy();
    const testAction = {
      type: "MARK_COMPLETE",
      taskId: testIncompleteTask.id,
    };
    const reducerOutput = tasksReducer(testInput, testAction);
    expect(reducerOutput[0].completed).toBeTruthy();
  });
});
