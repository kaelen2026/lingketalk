import Image from "next/image";
import aboutLingke from "@/public/images/about-lingke.png";

export function About() {
  return (
    <section className="about shell" id="about">
      <div className="about-photo">
        <Image
          src={aboutLingke}
          alt="灵客的匿名黑白侧影"
          fill
          placeholder="blur"
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
  );
}
