"use client";

import { useEffect, useState } from "react";

const gallerySlides = [
  {
    src: "/assets/shop-wash-area.png",
    alt: "高端宠物洗护店独立洗浴区",
    label: "洗浴区",
    title: "独立洗浴区",
    text: "玻璃分区、恒温洗护台和整洁备品展示。"
  },
  {
    src: "/assets/shop-grooming-area.png",
    alt: "高端宠物洗护店造型护理区",
    label: "造型护理区",
    title: "造型护理区",
    text: "低噪吹护、专业工具和独立护理台分区陈列。"
  },
  {
    src: "/assets/shop-reception-area.png",
    alt: "高端宠物洗护店接待等候区",
    label: "接待等候区",
    title: "接待等候区",
    text: "柔和灯光、舒适座椅和可观察护理动线。"
  }
];

function PawIcon() {
  return (
    <svg viewBox="0 0 24 24">
      <path d="M8 11c1.5-2 2.4-3 4-3s2.5 1 4 3" />
      <path d="M6.5 14.5c0 2.5 2.2 4 5.5 4s5.5-1.5 5.5-4c0-1.8-1.2-3-2.9-3.6" />
      <path d="M9.4 10.9C7.7 11.5 6.5 12.7 6.5 14.5" />
      <path d="M8 6.5h.01" />
      <path d="M16 6.5h.01" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M8 2v4" />
      <path d="M16 2v4" />
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M3 10h18" />
    </svg>
  );
}

function ArrowRightIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}

function SendIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M22 2 11 13" />
      <path d="m22 2-7 20-4-9-9-4 20-7Z" />
    </svg>
  );
}

function Gallery() {
  const [activeSlide, setActiveSlide] = useState(0);

  const showSlide = (index) => {
    setActiveSlide((index + gallerySlides.length) % gallerySlides.length);
  };

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % gallerySlides.length);
    }, 5200);

    return () => window.clearInterval(timer);
  }, []);

  const active = gallerySlides[activeSlide];

  return (
    <div className="space-gallery" aria-label="门店环境轮播图">
      {gallerySlides.map((slide, index) => (
        <figure
          className={`space-slide${index === activeSlide ? " is-active" : ""}`}
          key={slide.src}
        >
          <img src={slide.src} alt={slide.alt} />
        </figure>
      ))}
      <div className="space-dots" aria-label="选择门店环境图片">
        {gallerySlides.map((slide, index) => (
          <button
            className={`space-dot${index === activeSlide ? " is-active" : ""}`}
            type="button"
            aria-label={slide.label}
            key={slide.label}
            onClick={() => showSlide(index)}
          />
        ))}
      </div>
      <div className="space-caption">
        <div>
          <strong>{active.title}</strong>
          <span>{active.text}</span>
        </div>
        <div className="space-controls">
          <button
            className="space-control"
            type="button"
            aria-label="上一张"
            onClick={() => showSlide(activeSlide - 1)}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="m15 18-6-6 6-6" />
            </svg>
          </button>
          <button
            className="space-control"
            type="button"
            aria-label="下一张"
            onClick={() => showSlide(activeSlide + 1)}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="m9 18 6-6-6-6" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

function getTomorrowMorningValue() {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(9, 30, 0, 0);

  const timezoneOffset = tomorrow.getTimezoneOffset() * 60000;
  return new Date(tomorrow.getTime() - timezoneOffset).toISOString().slice(0, 16);
}

function BookingForm() {
  const [submitted, setSubmitted] = useState(false);
  const [arrivalTime, setArrivalTime] = useState("");

  useEffect(() => {
    setArrivalTime(getTomorrowMorningValue());
  }, []);

  return (
    <form
      action="#"
      method="post"
      onSubmit={(event) => {
        event.preventDefault();
        setSubmitted(true);
      }}
    >
      <div className="booking-grid">
        <label>
          主人姓名
          <input type="text" name="name" placeholder="请输入姓名" />
        </label>
        <label>
          联系电话
          <input type="tel" name="phone" placeholder="请输入手机号" />
        </label>
        <label>
          宠物类型
          <select name="pet">
            <option>小型犬</option>
            <option>中大型犬</option>
            <option>猫咪</option>
            <option>其他宠物</option>
          </select>
        </label>
        <label>
          服务项目
          <select name="service">
            <option>基础洁净浴</option>
            <option>深层养护浴</option>
            <option>美容造型</option>
            <option>猫咪轻护理</option>
          </select>
        </label>
        <label>
          期望到店日期
          <input
            type="datetime-local"
            name="arrivalTime"
            value={arrivalTime}
            onChange={(event) => setArrivalTime(event.target.value)}
          />
        </label>
        <label className="full">
          备注
          <textarea
            name="message"
            placeholder="例如宠物年龄、是否怕吹风、是否有皮肤问题"
          />
        </label>
        <div className="full">
          <button className="btn" type="submit">
            <SendIcon />
            提交预约
          </button>
          <p className={`form-note${submitted ? " is-visible" : ""}`} role="status">
            预约信息已记录，我们会尽快与您确认到店时间。
          </p>
        </div>
      </div>
    </form>
  );
}

export default function Home() {
  return (
    <>
      <header className="site-header">
        <nav className="container nav" aria-label="主导航">
          <a className="brand" href="#">
            <span className="brand-mark" aria-hidden="true">
              <PawIcon />
            </span>
            泡泡尾巴
          </a>
          <div className="nav-links">
            <a href="#services">洗护服务</a>
            <a href="#process">护理流程</a>
            <a href="#space">门店环境</a>
            <a href="#booking">预约到店</a>
          </div>
          <a className="btn" href="#booking" aria-label="立即预约">
            <CalendarIcon />
            立即预约
          </a>
        </nav>
      </header>

      <main>
        <section className="hero">
          <div className="container hero-content">
            <p className="eyebrow">精细洗护 · 安心托付</p>
            <h1>让每一只毛孩子干净、舒服、被温柔照顾</h1>
            <p className="hero-copy">
              泡泡尾巴提供犬猫洗澡、美容修剪、皮毛养护和基础健康观察。独立洗护间、可视化护理流程，适合怕生、敏感和需要耐心陪伴的宠物。
            </p>
            <div className="hero-actions">
              <a className="btn" href="#booking">
                <ArrowRightIcon />
                预约洗护
              </a>
              <a className="btn secondary" href="#services">
                查看套餐
              </a>
            </div>
            <div className="stats" aria-label="门店数据">
              <div className="stat">
                <strong>45min</strong>
                <span>小型犬基础洗护起</span>
              </div>
              <div className="stat">
                <strong>1v1</strong>
                <span>专属美容师服务</span>
              </div>
              <div className="stat">
                <strong>6项</strong>
                <span>到店基础检查</span>
              </div>
            </div>
          </div>
        </section>

        <section id="services">
          <div className="container">
            <div className="section-head">
              <h2>按宠物状态选择合适的护理</h2>
              <p>从日常清洁到造型修剪，每个套餐都会根据毛量、皮肤状态和性格耐受度调整节奏。</p>
            </div>
            <div className="service-grid">
              <article className="card">
                <span className="icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24">
                    <path d="M12 3c3 3.5 6 6.6 6 10a6 6 0 0 1-12 0c0-3.4 3-6.5 6-10Z" />
                  </svg>
                </span>
                <h3>基础洁净浴</h3>
                <p>温和清洁、吹干梳理、耳眼护理、脚底毛和指甲基础处理。</p>
                <div className="price">¥88 起</div>
              </article>
              <article className="card">
                <span className="icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24">
                    <path d="M4 9c5 1 7 4 8 11" />
                    <path d="M20 9c-5 1-7 4-8 11" />
                    <path d="M12 4v16" />
                  </svg>
                </span>
                <h3>深层养护浴</h3>
                <p>适合换毛期、皮肤干燥和毛发打结，搭配护毛素与低温慢吹。</p>
                <div className="price">¥138 起</div>
              </article>
              <article className="card">
                <span className="icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24">
                    <path d="m14.5 4.5 5 5" />
                    <path d="M4 20 19.5 4.5" />
                    <path d="M8 16l-4 4" />
                  </svg>
                </span>
                <h3>美容造型</h3>
                <p>泰迪、比熊、雪纳瑞等常见犬种造型，也支持局部精修。</p>
                <div className="price">¥188 起</div>
              </article>
              <article className="card">
                <span className="icon" aria-hidden="true">
                  <PawIcon />
                </span>
                <h3>猫咪轻护理</h3>
                <p>低刺激洗护、去浮毛、局部清洁，优先照顾猫咪情绪稳定。</p>
                <div className="price">¥168 起</div>
              </article>
            </div>
          </div>
        </section>

        <section id="process" className="process-band">
          <div className="container">
            <div className="section-head">
              <h2>洗护不是赶时间，是让宠物愿意配合</h2>
              <p>每一步都有明确目的，减少刺激、降低应激，也让主人更清楚护理过程。</p>
            </div>
            <div className="process">
              <article className="step">
                <h3>到店评估</h3>
                <p>查看皮肤、毛结、耳眼和指甲状态，确认宠物当天情绪。</p>
              </article>
              <article className="step">
                <h3>温和清洁</h3>
                <p>根据皮毛选择洗护用品，控制水温和冲洗力度。</p>
              </article>
              <article className="step">
                <h3>分区吹梳</h3>
                <p>低温慢吹并配合梳理，减少打结、闷毛和吹风压力。</p>
              </article>
              <article className="step">
                <h3>交付反馈</h3>
                <p>说明护理发现、后续建议和适合的到店频率。</p>
              </article>
            </div>
          </div>
        </section>

        <section id="space">
          <div className="container shop-layout">
            <div className="space-copy">
              <p className="eyebrow">透明护理空间</p>
              <h2>干净、分区、可观察，敏感宠物也能慢慢适应</h2>
              <p>门店设置独立洗护台、消毒工具柜和安静等待区。美容师会按宠物耐受度调整节奏，必要时分段完成护理。</p>
              <ul className="feature-list">
                <li>
                  <span className="check">✓</span>
                  <span>犬猫工具分开使用，到店前后完成台面消毒。</span>
                </li>
                <li>
                  <span className="check">✓</span>
                  <span>使用低敏洗护用品，支持自带药浴或特殊护理用品。</span>
                </li>
                <li>
                  <span className="check">✓</span>
                  <span>护理完成后提供照片反馈，重要异常及时告知主人。</span>
                </li>
              </ul>
            </div>
            <Gallery />
            <aside className="quote" aria-label="顾客评价">
              <article className="quote-item">
                <p>“我家狗狗以前很怕吹风，这里会先安抚再慢慢吹，洗完没有焦躁，毛也很蓬松。”</p>
                <small>来自附近社区顾客 · 奶油小贵宾主人</small>
              </article>
              <article className="quote-item">
                <p>“猫咪胆子小，美容师会让它先熟悉环境，洗护过程也会拍照反馈，很安心。”</p>
                <small>三台山花园顾客 · 布偶猫主人</small>
              </article>
              <article className="quote-item">
                <p>“修剪前会先确认造型和长度，耳朵、脚底这些细节处理得很干净。”</p>
                <small>太湖路社区顾客 · 比熊主人</small>
              </article>
            </aside>
          </div>
        </section>

        <section id="booking">
          <div className="container booking">
            <div className="section-head">
              <h2>预约到店</h2>
              <p>留下宠物信息和希望时间，我们会尽快确认合适的美容师与服务时段。</p>
            </div>
            <BookingForm />
          </div>
        </section>

        <section className="contact-band">
          <div className="container contact">
            <div className="contact-copy">
              <div>
                <h2>泡泡尾巴宠物洗护店</h2>
                <div className="contact-items">
                  <span>地址：宿迁市宿城区古北巷与太湖路交叉口西南20米</span>
                  <span>电话：021-8888 6688</span>
                  <span>微信：BubbleTailCare</span>
                </div>
              </div>
              <ul className="hours" aria-label="营业时间">
                <li>
                  <span>周一至周五</span>
                  <strong>10:00 - 20:00</strong>
                </li>
                <li>
                  <span>周六至周日</span>
                  <strong>09:30 - 21:00</strong>
                </li>
                <li>
                  <span>节假日</span>
                  <strong>提前预约</strong>
                </li>
              </ul>
            </div>
            <figure className="store-map" aria-label="泡泡尾巴宠物洗护店地图标记">
              <img
                src="/assets/store-location-map.png"
                alt="泡泡尾巴宠物洗护店位置地图，标记在宿迁市宿城区古北巷与太湖路交叉口西南20米"
              />
            </figure>
          </div>
        </section>
      </main>

      <footer>
        <div className="container footer-inner">
          <span>© 2026 泡泡尾巴宠物洗护店</span>
          <span>清洁、护理、造型与陪伴</span>
        </div>
      </footer>
    </>
  );
}
