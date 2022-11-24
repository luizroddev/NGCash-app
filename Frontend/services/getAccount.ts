import APIResponse from "../@types/IAPIResponse";

export default async function getAccount(): Promise<APIResponse> {
  return await fetch("http://localhost:7777/account", {
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
      return { data };
    })
    .catch((error) => {
      console.error("Erro:", error);
      return { error };
    });
}
