import { useState } from "react";
import "./App.css";

function App() {
  const [post, setPost] = useState("");
  const [feedback, setFeedback] = useState("");
  const isOverLimit = post.length > 100;

  const handlePost = () => {
    setPost("");
    setFeedback("Post submitted!");
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
              <button type="submit" disabled={post.length === 0 || isOverLimit}>
                Post note
                <span className="button-arrow" aria-hidden="true" />
              </button>
            </div>

            <p className="submit-feedback" role="status" aria-live="polite">
              {feedback}
            </p>
          </form>

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