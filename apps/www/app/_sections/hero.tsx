import Image from "next/image";
import { Arrow } from "@/app/arrow";
import heroBook from "@/public/images/hero-book.png";

export function Hero() {
  return (
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
          src={heroBook}
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
  );
}
