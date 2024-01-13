import {type UserType} from "../graphql/users.ts";
import {makeGQL, makeMutationHook, makeQueryHook} from "./helpers.ts";

// For getUser
type GetUserTData = {
  getUser: UserType;
};
type GetUserTVariables = {
  id?: number;
  email?: string;
};

const getUserGQL = makeGQL({
  name: "getUser",
  operationType: "query",
  args: {
    id: "Int",
    email: "String",
  },
  fields: [
    "id",
    "email",
    "firstName",
    "lastName",
    "createdTs",
    "updatedTs",
    "hashedPassword",
  ],
});

export const useGetUser = makeQueryHook<GetUserTData, GetUserTVariables>(
  getUserGQL
);

// For getUsers
type GetUsersTData = {
  getUsers: UserType[];
};
type GetUsersTVariables = object;

const getUsersGQL = makeGQL({
  name: "getUsers",
  operationType: "query",
  fields: [
    "id",
    "email",
    "firstName",
    "lastName",
    "createdTs",
    "updatedTs",
    "hashedPassword",
  ],
});

export const useGetUsers = makeQueryHook<GetUsersTData, GetUsersTVariables>(
  getUsersGQL
);

// For getUserMe
type GetUserMeTData = {
  getUserMe: UserType;
};
type GetUserMeTVariables = object;

const getUserMeGQL = makeGQL({
  name: "getUserMe",
  operationType: "query",
  fields: ["id", "email", "firstName", "lastName"],
});

export const useGetUserMe = makeQueryHook<GetUserMeTData, GetUserMeTVariables>(
  getUserMeGQL
);

// For saveUser
type SaveUserTData = {
  saveUser: UserType;
};
export type SaveUserTVariables = {
  email: string;
  firstName?: string;
  lastName?: string;
  password: string;
};

const saveUserGQL = makeGQL({
  name: "saveUser",
  operationType: "mutation",
  args: {
    email: "String!",
    firstName: "String",
    lastName: "String",
    password: "String!",
  },
  fields: ["id", "email", "firstName", "lastName", "createdTs", "updatedTs"],
});

export const useSaveUser = makeMutationHook<SaveUserTData, SaveUserTVariables>(
  saveUserGQL,
  {
    refetchQueries: ["getUserMe", "getUser", "getUsers"],
  }
);

// For deleteUser
type DeleteUserTData = {
  deleteUser: {
    deletedCount: number;
  };
};
type DeleteUserTVariables = {
  id: number;
};

const deleteUserGQL = makeGQL({
  name: "deleteUser",
  operationType: "mutation",
  args: {
    id: "Int!",
  },
});

export const useDeleteUser = makeMutationHook<
  DeleteUserTData,
  DeleteUserTVariables
>(deleteUserGQL, {
  refetchQueries: ["getUserMe", "getUser", "getUsers"],
});

// For login
type LoginTData = {
  login: {
    token: string;
  };
};
type LoginTVariables = {
  email: string;
  password: string;
};

const loginGQL = makeGQL({
  name: "login",
  operationType: "mutation",
  args: {
    email: "String!",
    password: "String!",
  },
  fields: ["token"],
});

export const useLogin = makeMutationHook<LoginTData, LoginTVariables>(
  loginGQL,
  {
    refetchQueries: ["getUserMe", "getUser", "getUsers"],
  }
);

// For log
type LogoutTData = {
  logout: boolean;
};
type LogoutTVariables = object;

export const logoutGQL = makeGQL({
  name: "logout",
  operationType: "mutation",
});

export const useLogout = makeMutationHook<LogoutTData, LogoutTVariables>(
  logoutGQL,
  {
    refetchQueries: ["getUserMe", "getUser", "getUsers"],
  }
);

// For checkUserExists
type CheckUserExistsTData = {
  checkUserExists: boolean;
};
type CheckUserExistsTVariables = {
  email: string;
};

const checkUserExistsGQL = makeGQL({
  name: "checkUserExists",
  operationType: "mutation",
  args: {
    email: "String!",
  },
});

export const useCheckUserExists = makeMutationHook<
  CheckUserExistsTData,
  CheckUserExistsTVariables
>(checkUserExistsGQL);
