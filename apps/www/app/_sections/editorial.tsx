import Image from "next/image";
import { Arrow } from "@/app/arrow";
import editorialArchitecture from "@/public/images/editorial-architecture.png";

/** The three editorial pillars the spec fixes: insight, practice, dialogue. */
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

export function Editorial() {
  return (
    <section className="editorial shell" id="insight">
      <div className="section-intro">
        <div>
          <span className="section-number">02</span>
          <h2>把复杂的技术，讲成人能用的判断。</h2>
          <p>不追逐每一个热点，只关注真正改变工作、创造与生活的信号。</p>
        </div>
        <div className="architecture">
          <Image
            src={editorialArchitecture}
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
  );
}
