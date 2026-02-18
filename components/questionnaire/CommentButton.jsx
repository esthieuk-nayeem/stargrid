"use client";

import { useState } from "react";
import { saveToolComment } from "@/lib/supabase";

export default function CommentButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [comment, setComment] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error

  const handleSubmit = async () => {
    if (!comment.trim()) return;
    setStatus("sending");
    try {
      await saveToolComment(comment.trim(), email.trim() || null);
      setStatus("sent");
      setComment("");
      setEmail("");
      setTimeout(() => {
        setIsOpen(false);
        setStatus("idle");
      }, 2000);
    } catch (err) {
      console.error("Comment save error:", err);
      setStatus("error");
    }
  };

  return (
    <>
      <button
        className="comment-fab"
        onClick={() => setIsOpen(true)}
        title="Leave feedback on this tool"
      >
        💬
      </button>

      {isOpen && (
        <div className="comment-overlay" onClick={() => { if (status !== "sending") setIsOpen(false); }}>
          <div className="comment-modal" onClick={e => e.stopPropagation()}>
            <div className="comment-modal__header">
              <h3>💬 Leave Feedback</h3>
              <button className="comment-close" onClick={() => setIsOpen(false)}>✕</button>
            </div>

            {status === "sent" ? (
              <div className="comment-modal__body">
                <div className="comment-success">
                  <span className="success-icon">✓</span>
                  <p>Thank you for your feedback!</p>
                </div>
              </div>
            ) : (
              <div className="comment-modal__body">
                <textarea
                  value={comment}
                  onChange={e => setComment(e.target.value)}
                  placeholder="Tell us what you think about this tool, suggest improvements, or report issues..."
                  rows={4}
                  disabled={status === "sending"}
                />
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="Email (optional, for follow-up)"
                  disabled={status === "sending"}
                />
                {status === "error" && (
                  <p className="comment-error">Something went wrong. Please try again.</p>
                )}
                <button
                  className="comment-submit"
                  onClick={handleSubmit}
                  disabled={!comment.trim() || status === "sending"}
                >
                  {status === "sending" ? "Sending..." : "Submit Feedback"}
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      <style jsx>{`
        .comment-fab {
          position: fixed;
          bottom: 28px;
          right: 28px;
          z-index: 900;
          width: 56px;
          height: 56px;
          border-radius: 50%;
          background: linear-gradient(135deg, #3D72FC, #5CB0E9);
          border: none;
          font-size: 24px;
          cursor: pointer;
          box-shadow: 0 4px 20px rgba(61,114,252,0.4);
          transition: all 0.3s;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .comment-fab:hover {
          transform: scale(1.1);
          box-shadow: 0 6px 30px rgba(61,114,252,0.5);
        }

        .comment-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.6);
          z-index: 1000;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .comment-modal {
          background: #1a1f35;
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: 20px;
          width: 90%;
          max-width: 480px;
          overflow: hidden;
        }

        .comment-modal__header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px 24px;
          border-bottom: 1px solid rgba(255,255,255,0.08);
        }

        .comment-modal__header h3 {
          font-size: 18px;
          font-weight: 700;
          color: #fff;
          margin: 0;
        }

        .comment-close {
          background: none;
          border: none;
          color: rgba(255,255,255,0.5);
          font-size: 18px;
          cursor: pointer;
          padding: 4px 8px;
          border-radius: 6px;
          transition: all 0.2s;
        }
        .comment-close:hover {
          background: rgba(255,255,255,0.1);
          color: #fff;
        }

        .comment-modal__body {
          padding: 24px;
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .comment-modal__body textarea {
          width: 100%;
          padding: 14px 16px;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.15);
          border-radius: 12px;
          color: #fff;
          font-size: 15px;
          resize: vertical;
          min-height: 100px;
          font-family: inherit;
          outline: none;
          transition: border-color 0.2s;
        }
        .comment-modal__body textarea:focus {
          border-color: #3D72FC;
        }
        .comment-modal__body textarea::placeholder {
          color: rgba(255,255,255,0.35);
        }

        .comment-modal__body input {
          width: 100%;
          padding: 12px 16px;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.15);
          border-radius: 12px;
          color: #fff;
          font-size: 14px;
          outline: none;
          font-family: inherit;
          transition: border-color 0.2s;
        }
        .comment-modal__body input:focus {
          border-color: #3D72FC;
        }
        .comment-modal__body input::placeholder {
          color: rgba(255,255,255,0.35);
        }

        .comment-submit {
          padding: 14px 24px;
          background: linear-gradient(135deg, #3D72FC, #5CB0E9);
          border: none;
          border-radius: 12px;
          color: #fff;
          font-size: 15px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s;
        }
        .comment-submit:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(61,114,252,0.4);
        }
        .comment-submit:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .comment-error {
          color: #FA5674;
          font-size: 13px;
          margin: 0;
        }

        .comment-success {
          text-align: center;
          padding: 20px;
        }
        .success-icon {
          display: inline-flex;
          width: 48px;
          height: 48px;
          align-items: center;
          justify-content: center;
          background: rgba(34,197,94,0.2);
          border-radius: 50%;
          font-size: 24px;
          color: #22c55e;
          margin-bottom: 12px;
        }
        .comment-success p {
          color: rgba(255,255,255,0.8);
          font-size: 16px;
          margin: 0;
        }
      `}</style>
    </>
  );
}