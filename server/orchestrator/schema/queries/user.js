const USER_GET_ALL_USERS = `#graphql
  query {
    getAllUsers {
      _id
      name
      email
      phoneNumber
      dateOfBirth
      address
      createdAt
      updatedAt
    }
  }
`;

const USER_REGISTER_NEW_USER = `#graphql
  mutation Mutation($input: NewUser) {
    registerNewUser(input: $input) {
      _id
      name
      email
      phoneNumber
      dateOfBirth
      address
      role
      createdAt
      updatedAt
    }
  }
`;

const USER_DELETE_USER_BY_ID = `#graphql
  mutation Mutation($_id: ID) {
    deleteUserById(_id: $_id) {
      message
      code
    }
  }
`;

const USER_UPDATE_USER = `#graphql
  mutation Mutation($input: UpdateUser) {
    updateUser(input: $input) {
      _id
      name
      email
      phoneNumber
      dateOfBirth
      address
      role
    }
  }
`;

const USER_UPDATE_USER_ROLE = `#graphql
  mutation Mutation($input: UpdateUserRole) {
    updateUserRole(input: $input) {
      _id
      name
      email
      phoneNumber
      dateOfBirth
      address
      role
    }
  }
`;

const USER_LOGIN_USER = `#graphql
  mutation Mutation($input: LoginUser) {
    loginUser(input: $input) {
      access_token
    }
  }
`;

module.exports = {
  USER_GET_ALL_USERS,
  USER_REGISTER_NEW_USER,
  USER_DELETE_USER_BY_ID,
  USER_UPDATE_USER,
  USER_UPDATE_USER_ROLE,
  USER_LOGIN_USER,
};
