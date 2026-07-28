import Image from "next/image";
import { Arrow } from "./arrow";
import { SubscriptionForm } from "./subscription-form";

const pillars = [
  {
    number: "01",
    title: "AI 洞察",
    description: "看清模型、产品与产业背后的变化。",
  },
  {
    number: "02",
    title: "工具实践",
    description: "亲自上手，留下真正值得使用的方法。",
  },
  {
    number: "03",
    title: "人物对话",
    description: "和创造者、研究者与行动者聊未来。",
  },
];

export default function Home() {
  return (
    <main>
      <section className="hero shell">
        <div className="hero-copy">
          <h1>
            在 AI 时代，
            <br />
            保持人的判断。
          </h1>
          <p>拆解技术浪潮，验证真实工具，和正在创造未来的人对话。</p>
          <div className="hero-actions">
            <a className="button" href="#subscribe">
              订阅 Lingke Talk
              <Arrow />
            </a>
            <a className="text-link" href="#about">
              认识灵客
              <Arrow />
            </a>
          </div>
        </div>
        <div className="hero-art">
          <Image
            src="/images/hero-book.png"
            alt="书页形成的抽象黑白影像"
            fill
            priority
            sizes="(max-width: 800px) 100vw, 48vw"
          />
          <div className="blue-bar" />
          <p>INSIGHT / PRACTICE / DIALOGUE</p>
        </div>
        <div className="hero-index" aria-hidden="true">
          <span>01</span>
          <span className="rule" />
          <span>向下探索</span>
        </div>
      </section>

      <section className="editorial shell" id="insight">
        <div className="section-intro">
          <div>
            <span className="section-number">02</span>
            <h2>把复杂的技术，讲成人能用的判断。</h2>
            <p>不追逐每一个热点，只关注真正改变工作、创造与生活的信号。</p>
          </div>
          <div className="architecture">
            <Image
              src="/images/editorial-architecture.png"
              alt="黑白建筑曲线"
              fill
              sizes="(max-width: 800px) 100vw, 45vw"
            />
          </div>
        </div>
        <div className="pillars" id="practice">
          {pillars.map((pillar) => (
            <article key={pillar.number}>
              <span>{pillar.number}</span>
              <h3>{pillar.title}</h3>
              <span className="rule" />
              <p>{pillar.description}</p>
              <a href="#subscribe">
                查看内容
                <Arrow />
              </a>
            </article>
          ))}
        </div>
      </section>

      <section className="about shell" id="about">
        <div className="about-photo">
          <Image
            src="/images/about-lingke.png"
            alt="灵客的匿名黑白侧影"
            fill
            sizes="(max-width: 800px) 100vw, 48vw"
          />
        </div>
        <div className="about-copy">
          <span />
          <h2>关于灵客</h2>
          <p className="about-lead">
            我是灵客，一个持续学习、实践，也持续发问的人。
          </p>
          <p>
            Lingke Talk 记录我对科技、AI
            与人的观察。这里没有神话式预测，只有经过思考和实践之后，值得与你分享的判断。
          </p>
        </div>
      </section>

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
    </main>
  );
}
