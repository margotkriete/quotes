import axios from "axios";

// TODO: rename this file and fix up types

export async function upload(formData: any): Promise<any> {
  const signedURL = await axios.post("/api/get-signed-url");
  axios.post("/api/upload-to-r2", { signedURL: signedURL });
  axios.post("/api/post", {
    title: formData.get("title"),
    author: formData.get("author"),
    note: formData.get("note"),
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
