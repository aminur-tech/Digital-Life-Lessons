
const HeaderMarquee = () => {
  const slogans = [
    "Knowledge is Digital. Wisdom is Human.",
    "Code for the Mind. Lessons for the Soul.",
    "Navigating Life in a Digital Age.",
    "Transforming Experience into Intelligence.",
    "Your Daily Byte of Life Wisdom."
  ];

  return (
    <div className="w-full bg-base-200 border-y border-base-300 py-2 overflow-hidden whitespace-nowrap">
      <div className="flex animate-marquee">
        {/* We duplicate the list to ensure a seamless infinite loop */}
        {[...slogans, ...slogans].map((slogan, idx) => (
          <div key={idx} className="flex items-center mx-10">
            <span className="text-xs font-bold uppercase tracking-widest opacity-60">
              {slogan}
            </span>
            <span className="ml-10 text-primary opacity-30">✦</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HeaderMarquee;