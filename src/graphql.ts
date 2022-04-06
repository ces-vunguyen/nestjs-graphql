
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export class CreateTodoInput {
    name?: Nullable<string>;
    userId?: Nullable<number>;
}

export class UpdateTodoInput {
    id: number;
    name?: Nullable<string>;
    done?: Nullable<boolean>;
}

export class CreateUserInput {
    exampleField?: Nullable<number>;
}

export class UpdateUserInput {
    id: number;
}

export class Todo {
    id: number;
    name?: Nullable<string>;
    done: boolean;
    userId?: Nullable<number>;
}

export abstract class IQuery {
    abstract todos(): Nullable<Todo>[] | Promise<Nullable<Todo>[]>;

    abstract todo(id: number): Nullable<Todo> | Promise<Nullable<Todo>>;

    abstract users(): Nullable<User>[] | Promise<Nullable<User>[]>;

    abstract user(id: number): Nullable<User> | Promise<Nullable<User>>;
}

export abstract class IMutation {
    abstract createTodo(createTodoInput: CreateTodoInput): Todo | Promise<Todo>;

    abstract updateTodo(updateTodoInput: UpdateTodoInput): Todo | Promise<Todo>;

    abstract removeTodo(id: number): Nullable<Todo> | Promise<Nullable<Todo>>;

    abstract createUser(createUserInput: CreateUserInput): User | Promise<User>;

    abstract updateUser(updateUserInput: UpdateUserInput): User | Promise<User>;

    abstract removeUser(id: number): Nullable<User> | Promise<Nullable<User>>;
}

export class User {
    id: number;
    name?: Nullable<string>;
}

type Nullable<T> = T | null;
