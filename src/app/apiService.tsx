import axios from "axios";

export function upload(formData: any) {
  axios
    .post("/api/upload", {
      title: formData.get("title"),
      author: formData.get("author"),
      note: formData.get("note"),
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
}

export async function getPost(id: string): Promise<Post | void> {
  try {
    const response = await axios.get(`/api/post/${id}`);
    return response.data.message[0];
  } catch (error) {
    console.log(error);
  }
}

export async function getPosts(): Promise<void | Post[]> {
  try {
    const response = await axios.get("/api/posts");
    return response.data.message;
  } catch (error) {
    console.log(error);
  }
}
