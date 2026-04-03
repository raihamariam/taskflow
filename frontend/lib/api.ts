const API_URL = "http://localhost:8000";


export async function getTasks(status?: string) {
  const url = status ? `${API_URL}/tasks?status=${status}` : `${API_URL}/tasks`;
  const res = await fetch(url);
  return res.json();
}

export async function createTask(data: any) {
  const res = await fetch(`${API_URL}/tasks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function updateTask(id: number, data: any) {
  const res = await fetch(`${API_URL}/tasks/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function deleteTask(id: number) {
  await fetch(`${API_URL}/tasks/${id}`, {
    method: "DELETE",
  });
}

export async function completeTask(id: number) {
  await fetch(`${API_URL}/tasks/${id}/complete`, {
    method: "PATCH",
  });
}