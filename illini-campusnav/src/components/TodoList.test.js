import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import TodoList from './TodoList';
import '@testing-library/jest-dom';

// Define localStorage mock
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn()
};

// Assign the localStorage mock to the global object
global.localStorage = localStorageMock;
describe('TodoList Component', () => {
  beforeEach(() => {
    localStorage.clear(); // Clear localStorage before each test
  });

  test('renders TodoList component', () => {
    render(<TodoList />);
    const inputElement = screen.getByPlaceholderText('Add a new task');
    const addButton = screen.getByText('Add Task');
    const allFilter = screen.getByText('All');
    const pendingFilter = screen.getByText('Pending');
    const completedFilter = screen.getByText('Completed');
    const clearAllButton = screen.getByText('Clear All');

    expect(inputElement).toBeInTheDocument();
    expect(addButton).toBeInTheDocument();
    expect(allFilter).toBeInTheDocument();
    expect(pendingFilter).toBeInTheDocument();
    expect(completedFilter).toBeInTheDocument();
    expect(clearAllButton).toBeInTheDocument();
  });

  test('allows user to add a new task', () => {
    render(<TodoList />);
    const inputElement = screen.getByPlaceholderText('Add a new task');
    const addButton = screen.getByText('Add Task');

    fireEvent.change(inputElement, { target: { value: 'Test Task' } });
    fireEvent.click(addButton);

    const taskItem = screen.getByText('Test Task');
    expect(taskItem).toBeInTheDocument();
  });

  // Add more test cases for other functionalities (editing task, deleting task, filtering tasks, etc.)
});
