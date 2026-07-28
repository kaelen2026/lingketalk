"use client";

import { type FormEvent, useState } from "react";

export function SubscriptionForm() {
  const [message, setMessage] = useState("");

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    setMessage("已记录你的订阅意向。邮件服务接入后，我们会正式开放订阅。");
    form.reset();
  }

  return (
    <div className="form-wrap">
      <form onSubmit={submit}>
        <label className="sr-only" htmlFor="email">
          你的邮箱
        </label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="你的邮箱"
          autoComplete="email"
          required
        />
        <button type="submit">
          加入订阅
          <svg aria-hidden="true" viewBox="0 0 24 24">
            <path d="M5 12h14M14 6l6 6-6 6" />
          </svg>
        </button>
      </form>
      <p className="privacy" aria-live="polite">
        {message || "我们尊重你的隐私。随时可以取消订阅。"}
      </p>
    </div>
  );
}
