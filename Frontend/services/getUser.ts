import APIResponse from "../@types/IAPIResponse";

export default async function getUser(userId: string): Promise<APIResponse> {
  return await fetch("http://localhost:7777/user/" + userId, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("@NGCash:token"),
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.message) {
        return { error: data.message };
      }
      localStorage.setItem("@NGCash:user", JSON.stringify(data));
      return { data: { data } };
    })
    .catch((error) => {
      console.error("Erro:", error);
      return { error };
    });
}
