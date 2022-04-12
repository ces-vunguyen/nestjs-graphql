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
import { ListItemButton } from '@mui/material';

const CREATE_TODO = gql`
  mutation CreateTodo($createTodoInput: CreateTodoInput!) {
    createTodo(createTodoInput: $createTodoInput) {
      id
      name
    }
  }
`;

const GET_TODOS = gql`
  query Todos {
    todos {
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
    update(cache, { data: { createTodo } }) {
      cache.modify({
        fields: {
          todos(existingTodos = []) {
            const newTodoRef = cache.writeFragment({
              data: createTodo,
              fragment: gql`
                fragment NewTodo on Todo {
                  id
                  name
                }
              `,
            });
            return [...existingTodos, newTodoRef];
          },
        },
      });
    },
  });

  if (loading) return '';
  // const [];
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

  return (
    <div>
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
              <ListItemButton key={id}>
                <ListItem
                  disablePadding
                  secondaryAction={
                    <IconButton edge="end" aria-label="delete">
                      <DeleteIcon />
                    </IconButton>
                  }
                >
                  <ListItemText primary={name} />
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
