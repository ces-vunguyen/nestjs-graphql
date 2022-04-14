import { gql, useMutation, useQuery } from '@apollo/client';
import { ssrClient } from '../apollo-client';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import { useState } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { ListItemButton, ListItemIcon } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';

const GET_TODOS = gql`
  query Todos {
    todos {
      id
      name
      done
    }
  }
`;

const CREATE_TODO = gql`
  mutation CreateTodo($createTodoInput: CreateTodoInput!) {
    createTodo(createTodoInput: $createTodoInput) {
      id
      name
    }
  }
`;

const DELETE_TODO = gql`
  mutation DeleteTodo($id: Int!) {
    removeTodo(id: $id) {
      id
    }
  }
`;

const UPDATE_TODO = gql`
  mutation UpdateTodo($updateTodoInput: UpdateTodoInput!) {
    updateTodo(updateTodoInput: $updateTodoInput) {
      id
      name
      done
    }
  }
`;
export function Index() {
  const { data, loading, error } = useQuery(GET_TODOS);
  const [newTodo, setNewTodo] = useState('');
  const [createTodo] = useMutation(CREATE_TODO, {
    refetchQueries: [{ query: GET_TODOS }],
    // update(cache, { data: { createTodo } }) {
    //   const { todos: existingTodos } = cache.readQuery({
    //     query: GET_TODOS,
    //   });
    //   console.log(existingTodos);
    //   if (existingTodos && createTodo) {
    //     cache.writeQuery({
    //       query: GET_TODOS,
    //       data: {
    //         todos: [...existingTodos, createTodo],
    //       },
    //     });
    //   }
    // cache.modify({
    //   fields: {
    //     todos(existingTodos = []) {
    //       const newTodoRef = cache.writeFragment({
    //         data: createTodo,
    //         fragment: gql`
    //           fragment NewTodo on Todo {
    //             id
    //             name
    //           }
    //         `,
    //       });
    //       return [...existingTodos, newTodoRef];
    //     },
    //   },
    // });
    // },
  });
  const [deleteTodo] = useMutation(DELETE_TODO, {
    refetchQueries: [{ query: GET_TODOS }],
  });
  const [updateTodo] = useMutation(UPDATE_TODO, {
    refetchQueries: [{ query: GET_TODOS }],
  });

  if (loading) return '';
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTodo(event.target.value);
  };

  if (error) return `Submission error! ${error.message}`;
  const onEnter = (ev) => {
    if (ev.key !== 'Enter' || !newTodo) {
      return;
    }

    ev.preventDefault();
    createTodo({ variables: { createTodoInput: { name: newTodo } } });
    setNewTodo('');
  };

  const onClickDelete = (ev, id) => {
    ev.stopPropagation();
    deleteTodo({ variables: { id } });
  };

  const onClickTodo = ({ id, done }) => {
    updateTodo({ variables: { updateTodoInput: { id, done: !done } } });
  };

  return (
    <div style={{ marginTop: '20vh' }}>
      <Grid container alignItems="center" justifyContent="center">
        <Grid item xs={3}>
          <TextField
            id="standard-basic"
            label="Type todo"
            variant="standard"
            fullWidth
            autoFocus
            value={newTodo}
            onChange={onChange}
            onKeyPress={onEnter}
          />
          <List>
            {data.todos.map(({ id, name, done }) => (
              <ListItemButton
                key={id}
                onClick={() => onClickTodo({ id, done })}
              >
                <ListItem
                  disablePadding
                  secondaryAction={
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={(ev) => onClickDelete(ev, id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  }
                >
                  <ListItemIcon>{done && <CheckIcon />}</ListItemIcon>
                  <ListItemText
                    primary={name}
                    sx={{ textDecoration: done ? 'line-through' : 'none' }}
                  />
                </ListItem>
              </ListItemButton>
            ))}
          </List>
        </Grid>
      </Grid>
    </div>
  );
}

// export async function getServerSideProps() {
//   const { data } = await ssrClient.query({
//     query: GET_TODOS,
//   });

//   return {
//     props: data,
//   };
// }

export default Index;
