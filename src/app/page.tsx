import Link from "next/link";

export default function Home() {
  return (
    <div className="relative mx-auto max-w-[1140px] px-6 py-10 sm:px-10">
      <div className="confetti c1" />
      <div className="confetti c2" />
      <div className="confetti c3" />
      <div className="confetti c4" />
      <div className="confetti c5" />

      <div className="relative z-10 flex items-center justify-between border-b border-border pb-5 text-xs font-mono text-muted-foreground">
        <div>
          <span className="mr-1.5 inline-block h-2 w-2 animate-pulse rounded-full bg-hotpink align-middle" />
          <span className="mr-1.5 inline-block h-2 w-2 animate-pulse rounded-full bg-lime align-middle [animation-delay:0.3s]" />
          <span className="mr-1.5 inline-block h-2 w-2 animate-pulse rounded-full bg-aqua align-middle [animation-delay:0.6s]" />
          {" "}fytcyte // portfolio_os
        </div>
        <div>
          f/<b className="font-medium text-sky">1.8</b> · 1/<b className="font-medium text-sky">200</b> · ISO{" "}
          <b className="font-medium text-sky">200</b>
        </div>
      </div>

      <div className="hero relative z-10 mt-10 px-6 py-16 text-center sm:px-12 sm:py-20">
        <div className="orb orb-1">
          <div className="glint" />
        </div>
        <div className="orb orb-2" />
        <div className="orb orb-3" />
        <div className="shard shard-1" />
        <div className="vf-corner vf-tl" />
        <div className="vf-corner vf-tr" />
        <div className="vf-corner vf-bl" />
        <div className="vf-corner vf-br" />
        <div className="filmstrip" />

        <div className="relative z-10">
          <div className="eyebrow mb-6">✨ // portfolio_os</div>
          <h1 className="mb-1.5 font-display text-4xl leading-tight font-extrabold tracking-tight sm:text-6xl">
            Build your portfolio.
            <br />
            <span className="grad-text">Shoot with the right people.</span>
          </h1>
          <p className="subtag mb-6 text-lg sm:text-xl">
            for models &amp; photographers who show up prepared
          </p>
          <p className="mx-auto mb-9 max-w-[500px] font-mono text-sm leading-7 text-muted-foreground">
            glass panels, terminal energy, and real shoot-day tools — collaboration
            that feels as good as the work you make.
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/signup">
              <button className="btn-pop px-8 py-4 text-base">Start building →</button>
            </Link>
            <Link href="#how-it-works">
              <button className="btn-glass px-8 py-4 text-base">See how it works</button>
            </Link>
          </div>
        </div>
      </div>

      <div id="how-it-works" className="relative z-10 mt-14 mb-6 font-mono text-xs tracking-wider text-muted-foreground uppercase">
        {"// core_modules"}
      </div>
      <div className="relative z-10 mb-14 grid grid-cols-1 gap-[18px] sm:grid-cols-3">
        <div className="tile tile-1 p-7">
          <div className="shape-acc" />
          <span className="relative mb-3.5 block text-2xl">🎯</span>
          <h3 className="relative mb-2 font-display text-xl font-bold">Portfolio Gaps</h3>
          <p className="relative text-sm leading-6 text-muted-foreground">
            See exactly what&apos;s missing from your book, and who&apos;s ready to
            shoot it with you.
          </p>
        </div>
        <div className="tile tile-2 p-7">
          <div className="shape-acc" />
          <span className="relative mb-3.5 block text-2xl">📋</span>
          <h3 className="relative mb-2 font-display text-xl font-bold">Shoot Listings</h3>
          <p className="relative text-sm leading-6 text-muted-foreground">
            Structured, clear, no guesswork — concept, location, and terms up
            front.
          </p>
        </div>
        <div className="tile tile-3 p-7">
          <div className="shape-acc" />
          <span className="relative mb-3.5 block text-2xl">🤖</span>
          <h3 className="relative mb-2 font-display text-xl font-bold">AI Shoot Assistant</h3>
          <p className="relative text-sm leading-6 text-muted-foreground">
            A planning co-pilot for shot lists and lighting, never a judge of how
            you look.
          </p>
        </div>
      </div>

      <div className="relative z-10 mb-14">
        <div className="mb-[18px] flex flex-wrap items-end justify-between gap-3">
          <div>
            <div className="potw-badge mb-2.5">🏆 Portfolio of the Week</div>
            <div className="mb-1 font-display text-2xl font-bold">Maren Cole</div>
            <div className="font-mono text-xs text-muted-foreground">
              Editorial &amp; fitness · Chicago, IL · closed 3 portfolio gaps this month
            </div>
          </div>
          <span className="font-mono text-xs text-sky">Illustrative example — not a real member yet</span>
        </div>
        <div className="grid grid-cols-1 gap-[18px] lg:grid-cols-[1.4fr_1fr]">
          <div className="potw-feature">
            <div className="lens-flare" />
            <div className="flash-burst">
              <div className="flash-ray fr1" />
              <div className="flash-ray fr2" />
              <div className="flash-ray fr3" />
              <div className="flash-ray fr4" />
              <div className="flash-ray fr5" />
              <div className="flash-ray fr6" />
              <div className="flash-ray fr7" />
              <div className="flash-ray fr8" />
              <div className="flash-core" />
            </div>
            <div className="potw-feature-corner">f/2.0 · golden hour</div>
            <div className="potw-feature-tag">
              <span className="live-dot" /> featured this week
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <div className="potw-runner pr1">
              <div className="runner-flash" />
              <span className="runner-name">Editorial</span>
              <span className="runner-num">02</span>
            </div>
            <div className="potw-runner pr2">
              <div className="runner-flash" />
              <span className="runner-name">Fitness</span>
              <span className="runner-num">03</span>
            </div>
            <div className="potw-runner pr3">
              <div className="runner-flash" />
              <span className="runner-name">Studio</span>
              <span className="runner-num">04</span>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 mb-14 flex flex-wrap justify-center gap-3.5">
        <div className="badge">
          🟢 <b>TFP</b> or paid
        </div>
        <div className="badge">
          🔒 <b>18+</b> verified
        </div>
        <div className="badge">
          🚫 <b>0</b> follower counts
        </div>
        <div className="badge">
          ✨ <b>consent-first</b> always
        </div>
      </div>

      <div className="marquee-wrap relative z-10 mb-10">
        <div className="marquee">
          {Array.from({ length: 2 }).map((_, i) => (
            <span key={i} className="flex shrink-0 gap-10">
              <span>portfolio gaps closed daily</span>
              <span className="hot">✦</span>
              <span>tfp shoots, real deliverables</span>
              <span className="hot">✦</span>
              <span>no likes, no followers, just work</span>
              <span className="hot">✦</span>
              <span>safety-first, always</span>
              <span className="hot">✦</span>
            </span>
          ))}
        </div>
      </div>

      <footer className="relative z-10 border-t border-border pt-8 text-center font-mono text-[11px] tracking-wide text-muted-foreground">
        fytcyte.app — theme direction draft, not final copy
      </footer>
    </div>
  );
}
