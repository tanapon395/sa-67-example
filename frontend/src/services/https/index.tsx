import { UsersInterface } from "../../interfaces/IUser";

const apiUrl = "http://localhost:8000";

async function GetUsers() {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const response = await fetch(`${apiUrl}/users`, requestOptions);
    const data = await response.json();

    return {
      status: response.ok,
      data: data,
      message: response.ok ? data.message : data.error,
    };
  } catch (error) {
    return {
      status: false,
      message: "An error occurred",
    };
  }
}

async function GetGenders() {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const response = await fetch(`${apiUrl}/genders`, requestOptions);
    const data = await response.json();

    return {
      status: response.ok,
      data: data,
      message: response.ok ? data.message : data.error,
    };
  } catch (error) {
    return {
      status: false,
      message: "An error occurred",
    };
  }
}

async function DeleteUserByID(id: Number | undefined) {
  const requestOptions = {
    method: "DELETE",
  };

  try {
    const response = await fetch(`${apiUrl}/users/${id}`, requestOptions);
    const data = await response.json();

    return {
      status: response.ok,
      message: response.ok ? data.message : data.error,
    };
  } catch (error) {
    return {
      status: false,
      message: "An error occurred",
    };
  }
}

async function GetUserById(id: Number | undefined) {
  const requestOptions = {
    method: "GET",
  };

  try {
    const response = await fetch(`${apiUrl}/user/${id}`, requestOptions);
    const data = await response.json();

    return {
      status: response.ok,
      data: data,
      message: response.ok ? data.message : data.error,
    };
  } catch (error) {
    return {
      status: false,
      message: "An error occurred",
    };
  }
}

async function CreateUser(data: UsersInterface) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };

  try {
    const response = await fetch(`${apiUrl}/users`, requestOptions);
    const data = await response.json();

    return {
      status: response.ok,
      message: response.ok ? data.message : data.error,
    };
  } catch (error) {
    return {
      status: false,
      message: "An error occurred",
    };
  }
}

async function UpdateUser(data: UsersInterface) {
  const requestOptions = {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };

  try {
    const response = await fetch(`${apiUrl}/users`, requestOptions);
    const data = await response.json();

    return {
      status: response.ok,
      message: response.ok ? data.message : data.error,
    };
  } catch (error) {
    return {
      status: false,
      message: "An error occurred",
    };
  }
}

export {
  GetUsers,
  CreateUser,
  GetGenders,
  DeleteUserByID,
  GetUserById,
  UpdateUser,
};
