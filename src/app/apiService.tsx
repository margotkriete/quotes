import axios from "axios";

function getPublicBucketUrl(key: string): string {
  return `https://pub-5c17239b18ba40cf8468fa65ff286b37.r2.dev/${key}`;
}

export async function upload(file: File): Promise<string | void> {
  try {
    // Retrieve signed URL, then PUT file contents in signed URL
    const response = await axios.post("/api/get-signed-url");
    const signedURL: string = response.data.url;
    await axios.put(signedURL, file, {
      headers: { "Content-Type": file.type },
    });
    return getPublicBucketUrl(response.data.key);
  } catch (error) {
    console.log(error);
  }
}

export async function submitLogin(username: string, password: string) {
  try {
    const response: any = await axios.post("/api/login/password", {
      username: username,
      password: password,
    });
    return response.username;
  } catch (error) {
    console.log(error);
  }
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
    return response.data.id;
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
