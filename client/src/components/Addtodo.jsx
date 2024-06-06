import { useState } from 'react';
import { Button, HStack, Input, useToast } from '@chakra-ui/react'


function AddTodo({ onAddTodo }) {
  const [todo, setTodo] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (todo.trim()) {
      await onAddTodo(todo);
      setTodo('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
    <HStack m='8'>
      <Input
        variant='filled'
        type="text"
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
        placeholder="Add a new todo"
      />
      <Button type='submit' colorScheme='green' px='8'>Add Todo</Button>
      </HStack>
    </form>
  );
}

export default AddTodo;
