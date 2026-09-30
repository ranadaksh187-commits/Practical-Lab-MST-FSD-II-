import { useState } from "react";
import "./App.css";

function App() {
  const [post, setPost] = useState("");
  const [feedback, setFeedback] = useState("");
  const [postOption, setPostOption] = useState("");
  const [posts, setPosts] = useState([
    {
      id: 1,
      message: "A small note is still a thought worth keeping.",
      option: "public",
    },
  ]);
  const isOverLimit = post.length > 100;
  const hasPostOption = postOption !== "";
  const canSubmit = post.trim().length > 0 && !isOverLimit && hasPostOption;

  const handlePost = () => {
    if (!canSubmit) {
      return;
    }

    const postedTo = postOption.charAt(0).toUpperCase() + postOption.slice(1);
    const newPost = {
      id: Date.now(),
      message: post.trim(),
      option: postOption,
    };

    setPosts((currentPosts) => [newPost, ...currentPosts]);
    setPost("");
    setPostOption("");
    setFeedback(`Post submitted to ${postedTo}!`);
  };

  return (
    <main className="page-shell">
      <header className="topbar">
        <a className="wordmark" href="#top" aria-label="Little Post home">
          <span className="wordmark-icon" aria-hidden="true">
            <span />
            <span />
            <span />
          </span>
          <span>little post</span>
        </a>
        <span className="topbar-note">A quiet place for a thought</span>
      </header>

      <section className="compose-area" id="top" aria-labelledby="page-title">
        <div className="compose-sheet">
          <div className="sheet-topline">
            <span className="eyebrow">YOUR POST BOX</span>
            <span className="draft-status">
              <span className="status-dot" />
              New draft
            </span>
          </div>

          <div className="intro">
            <h1 id="page-title">Post box<span>.</span></h1>
            <p>Make room for a little thought.</p>
          </div>

          <form
            className="post-form"
            onSubmit={(event) => {
              event.preventDefault();
              handlePost();
            }}
          >
            <div className="post-options">
              <label className="field-label">POST OPTIONS</label>
              <div className="option-grid" role="group" aria-label="Post options">
                {[
                  { value: "public", label: "Public" },
                  { value: "friends", label: "Friends" },
                  { value: "private", label: "Only me" },
                ].map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    className={`option-pill${postOption === option.value ? " is-selected" : ""}`}
                    onClick={() => {
                      setPostOption(option.value);
                      setFeedback("");
                    }}
                    aria-pressed={postOption === option.value}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            <label className="field-label" htmlFor="post-content">
              YOUR MESSAGE
            </label>
            <textarea
              id="post-content"
              value={post}
              onChange={(event) => {
                setPost(event.target.value);
                setFeedback("");
              }}
              placeholder="What's on your mind?"
              rows={5}
              aria-invalid={isOverLimit || undefined}
              aria-describedby="writing-help post-counter"
            />

            <div className="writing-meta">
              <p id="writing-help">Keep it short and sweet.</p>
              <p
                className={`character-count${isOverLimit ? " is-over-limit" : ""}`}
                id="post-counter"
                aria-live="polite"
              >
                <span>{post.length}</span> / 100
              </p>
            </div>

            <div
              className={`character-meter${isOverLimit ? " is-over-limit" : ""}`}
              role="progressbar"
              aria-label="Character limit"
              aria-valuemin="0"
              aria-valuemax="100"
              aria-valuenow={Math.min(post.length, 100)}
            >
              <span style={{ width: `${Math.min(post.length, 100)}%` }} />
            </div>

            {isOverLimit && (
              <p className="limit-message" role="alert">
                Limit exceeded
              </p>
            )}

            <div className="form-actions">
              <span className="action-note">Sent with a little care</span>
              <button type="submit" disabled={!canSubmit}>
                Post note
                <span className="button-arrow" aria-hidden="true" />
              </button>
            </div>

            <p className="submit-feedback" role="status" aria-live="polite">
              {feedback}
            </p>
          </form>

          <section className="posts-panel" aria-live="polite">
            <div className="posts-header">
              <span className="eyebrow">RECENT POSTS</span>
              <span className="post-count">{posts.length}</span>
            </div>

            <ul className="post-list">
              {posts.map(({ id, message, option }) => (
                <li key={id} className="post-item">
                  <div className="post-item-topline">
                    <span className="post-tag">{option}</span>
                    <span className="post-dot" aria-hidden="true" />
                  </div>
                  <p>{message}</p>
                </li>
              ))}
            </ul>
          </section>

          <div className="sheet-footer" aria-hidden="true">
            <span>TAKE YOUR TIME</span>
            <span className="footer-flower" />
            <span>THOUGHTS, IN 100 CHARACTERS</span>
          </div>
        </div>
        <div className="page-caption" aria-hidden="true">
          <span>ONE THOUGHT AT A TIME</span>
          <span>01 / 01</span>
        </div>
      </section>
    </main>
  );
}

export default App;