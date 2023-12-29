import axios from "axios";

export async function loginUser(params: { email: string; password: string }) {
  const { email, password } = params;

  const response = await axios.post("/user/signin", {
    email,
    password,
  });

  if (response.status !== 201) {
    throw new Error(response.data.message);
  }

  const data = await response.data;

  return data;
}

export async function registerUser(params: {
  name: string;
  email: string;
  password: string;
}) {
  const { name, email, password } = params;

  const response = await axios.post("/user/signup", {
    name,
    email,
    password,
  });

  if (response.status !== 201) {
    throw new Error(response.data.message);
  }

  const data = await response.data;

  return data;
}

export async function checkAuthStatus() {
  const response = await axios.get("/user/auth-status");

  if (response.status !== 201) {
    throw new Error(response.data.message);
  }

  const data = await response.data;
  return data;
}

export async function sendChatReq(message: string) {
  const response = await axios.post("/chat/new", {
    message,
  });

  if (response.status !== 200) {
    throw new Error("Error sending message");
  }

  const data = await response.data;
  return data;
}

export async function getUserChats() {
  const response = await axios.get("/chat/all-chats");

  if (response.status !== 200) {
    throw new Error("Error getting all chats");
  }

  const data = await response.data;
  return data;
}

export async function deleteUserChats() {
  const response = await axios.delete("/chat/delete");

  if (response.status !== 200) {
    throw new Error("Error deleting chats");
  }

  const data = await response.data;
  return data;
}

export async function userLogOut() {
  const response = await axios.get("/user/logout");

  if (response.status !== 201) {
    throw new Error("Error deleting chats");
  }

  const data = await response.data;
  return data;
}
