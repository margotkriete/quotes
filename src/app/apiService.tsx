import axios from "axios";

export async function upload(file: any): Promise<any> {
  const resp: any = await axios.post("/api/get-signed-url");
  const signedURL: string = resp.data.url;
  const result = await axios.put(signedURL, file, {
    headers: { "Content-Type": file.type },
  });
  return result.data.url;
}

export async function createPost(
  post: CreatePostProps
): Promise<string | void> {
  try {
    const response = await axios.post("/api/post", {
      title: post.title,
      author: post.author,
      note: post.note,
      url: post.url,
    });
    return response.data.message.id;
  } catch (error) {
    console.log(error);
  }
}

export async function getPost(id: string): Promise<Post | void> {
  try {
    const response = await axios.get(`/api/post/${id}`);
    return response.data.message[0];
  } catch (error) {
    console.log(error);
  }
}

export async function getPosts(): Promise<Post[] | void> {
  try {
    const response = await axios.get("/api/posts");
    return response.data.message;
  } catch (error) {
    console.log(error);
  }
}
