import { useEffect, useState } from 'react';
import { IconButton } from '@chakra-ui/button';
import { Heading, useColorMode, VStack } from '@chakra-ui/react';
import { FaMoon, FaSun } from 'react-icons/fa';
import AddTodo from './components/Addtodo';
import TodoList from './components/Todolist';
import { getTodos, createTodo, updateTodo, deleteTodo } from './components/api';


function App() {
  const [todos, setTodos] = useState([]);
  const { colorMode, toggleColorMode } = useColorMode();

  const fetchTodos = async () => {
    try {
      const fetchedTodos = await getTodos();
      setTodos(fetchedTodos);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const handleAddTodo = async (body) => {
    try {
      const newTodo = await createTodo({
        body,
        completed: false,
      });
      setTodos((prevTodos) => [...prevTodos, newTodo]);
    } catch (error) {
      console.error('Error creating todo:', error);
    }
  };

  const handleUpdateTodo = async (id, body) => {
    try {
      await updateTodo(id, { body });
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo._id === id ? { ...todo, body } : todo
        )
      );
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  const handleToggleTodo = async (id, completed) => {
    try {
      await updateTodo(id, { completed: !completed });
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo._id === id ? { ...todo, completed: !completed } : todo
        )
      );
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  const handleDeleteTodo = async (id) => {
    try {
      await deleteTodo(id);
      setTodos((prevTodos) => prevTodos.filter((todo) => todo._id !== id));
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };
  

  const buttonProps = {
    size: 'lg',
    isRound: true,
    alignSelf: 'flex-end',
    icon: colorMode === 'light' ? <FaMoon /> : <FaSun />,
    'aria-label': 'Switch DarkMode',
  };

  return (
    <VStack p={4}>
      <IconButton onClick={toggleColorMode} {...buttonProps} />
      <Heading mb='8' fontWeight='extrabold' size='2xl' bgGradient='linear(to-r, pink.500, pink.300, blue.500)' bgClip='text'>
        Todo App
      </Heading>
      <AddTodo onAddTodo={handleAddTodo} />
      <TodoList todos={todos} onToggleTodo={handleToggleTodo} onUpdateTodo={handleUpdateTodo} onDeleteTodo={handleDeleteTodo} />
    </VStack>
  );
}

export default App;
