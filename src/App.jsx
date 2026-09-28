import { useState } from "react";

function App() {
  const [post, setPost] = useState("");

  const handlePost = () => {
    alert("Post submitted!");
  };

  return (
    <div>
      <h1>Post Box</h1>

      <textarea
        value={post}
        onChange={(e) => setPost(e.target.value)}
        placeholder="Write your post..."
      />

      <p>{post.length} / 100</p>

      {post.length > 100 && (
        <p style={{ color: "red" }}>Limit exceeded</p>
      )}

      <button
        onClick={handlePost}
        disabled={post.length === 0 || post.length > 100}
      >
        Post
      </button>
    </div>
  );
}

export default App;