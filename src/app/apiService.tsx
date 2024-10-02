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

export function getPost(id: string): Post | null {
  let post = null;
  axios
    .get(`/api/post/${id}`)
    .then(function (response) {
      post = response.data.message[0];
    })
    .catch(function (error) {
      console.log(error);
    });
  return post;
}

export function getPosts(): Array<Post> {
  let posts: Array<Post> = [];
  axios
    .get("/api/posts")
    .then(function (response) {
      posts = response.data.message;
    })
    .catch(function (error) {
      console.log(error);
    });
  return posts;
}
