import { SubscriptionForm } from "@/app/subscription-form";

export function Subscribe() {
  return (
    <section className="subscribe" id="subscribe">
      <div className="shell subscribe-inner">
        <div>
          <h2>和我一起，看懂正在发生的未来。</h2>
          <p>
            不定期发送 AI 洞察、工具实践与深度对话。
            <br />
            保持克制，只分享值得读的内容。
          </p>
        </div>
        <SubscriptionForm />
      </div>
    </section>
  );
}
