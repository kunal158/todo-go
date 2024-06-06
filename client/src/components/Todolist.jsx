import { Button,Stack, FormControl, HStack, IconButton, Input, Spacer, StackDivider, Text, VStack } from '@chakra-ui/react';
import { FaEdit, FaTrash, FaCheck } from 'react-icons/fa';
import { useState } from 'react';

function TodoList({ todos = [], onUpdateTodo, onDeleteTodo, onToggleTodo }) {
  const [editId, setEditId] = useState(null);
  const [editBody, setEditBody] = useState('');

  const vStackProps = {
    p: '4',
    w: '100%',
    maxW: { base: '90vw', sm: '80vw', lg: '50vw', xl: '40vw' },
    borderColor: 'gray.100',
    borderWidth: '2px',
    borderRadius: 'lg',
    alignItems: 'stretch',
    divider: <StackDivider />
  };

  const buttonProps = {
    isRound: true,
    'aria-label': 'delete',
  };

  const handleUpdate = (id, body) => {
    setEditId(id);
    setEditBody(body);
  };

  const handleSave = async (id) => {
    try {
      await onUpdateTodo(id, editBody);
      setEditId(null);
      setEditBody('');
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  const handleCancel = () => {
    setEditId(null);
    setEditBody('');
  };

  const handleToggle = async (id, completed) => {
    try {
      await onToggleTodo(id, completed); // Toggle the completed status
    } catch (error) {
      console.error('Error toggling todo:', error);
    }
  };

  const handleDeleteTodo = async (id) => {
    try {
      await onDeleteTodo(id);
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  return (
    <VStack {...vStackProps}>
      {todos.length === 0 ? (
        <Text color='gray.500' p='4' m='4' borderRadius='lg'>
          No Todos, yay!!!
        </Text>
      ) : (
        todos.map((todo) => (
          <HStack key={todo._id} spacing='2'>
            {editId === todo._id ? (
                <FormControl w='100%'>
                <Stack spacing={1}>
                    <Input
                    type='text'
                    value={editBody}
                    onChange={(e) => setEditBody(e.target.value)}
                    />
                    <HStack spacing={4}>
                    <Button onClick={() => handleSave(todo._id)}>Save</Button>
                    <Button onClick={handleCancel}>Cancel</Button>
                    </HStack>
                </Stack>
                </FormControl>

            ) : (
              <>
                <Text flex='1' textDecoration={todo.completed ? 'line-through' : 'none'}>
                  {todo.body}
                </Text>
                <HStack spacing={2}>
                  <IconButton
                    onClick={() => handleToggle(todo._id, todo.completed)}
                    icon={<FaCheck />}
                    {...buttonProps}
                  />
                  <IconButton
                    onClick={() => handleUpdate(todo._id, todo.body)}
                    icon={<FaEdit />}
                    {...buttonProps}
                  />
                  <IconButton
                    onClick={() => handleDeleteTodo(todo._id)}
                    icon={<FaTrash />}
                    {...buttonProps}
                  />
                </HStack>
              </>
            )}
          </HStack>
        ))
      )}
    </VStack>
  );
}

export default TodoList;
