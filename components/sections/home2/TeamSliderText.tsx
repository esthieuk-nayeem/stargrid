

export default function TeamSliderText() {
  return (
    <div className="sliding-tex overflow-hidden whitespace-nowrap">
      <div className="sliding-text-two__wrap relative flex">
        {/* Marquee content */}
        <ul className="sliding-text-two__list list-unstyled flex animate-marquee">
          <li><h2 data-hover="Branding" className="sliding-text-two__title">Branding</h2></li>
          <li><h2 data-hover="Web Design" className="sliding-text-two__title">Web Design</h2></li>
          <li><h2 data-hover="Promotion" className="sliding-text-two__title">Promotion</h2></li>
          <li><h2 data-hover="Branding" className="sliding-text-two__title">Branding</h2></li>
          <li><h2 data-hover="Promotion" className="sliding-text-two__title">Promotion</h2></li>
          <li><h2 data-hover="Branding" className="sliding-text-two__title">Branding</h2></li>
          <li><h2 data-hover="Web Design" className="sliding-text-two__title">Web Design</h2></li>
          <li><h2 data-hover="Promotion" className="sliding-text-two__title">Promotion</h2></li>
        </ul>

        {/* Duplicate list for seamless loop */}
        <ul className="sliding-text-two__list list-unstyled flex animate-marquee" aria-hidden="true">
          <li><h2 data-hover="Branding" className="sliding-text-two__title">Branding</h2></li>
          <li><h2 data-hover="Web Design" className="sliding-text-two__title">Web Design</h2></li>
          <li><h2 data-hover="Promotion" className="sliding-text-two__title">Promotion</h2></li>
          <li><h2 data-hover="Branding" className="sliding-text-two__title">Branding</h2></li>
          <li><h2 data-hover="Promotion" className="sliding-text-two__title">Promotion</h2></li>
          <li><h2 data-hover="Branding" className="sliding-text-two__title">Branding</h2></li>
          <li><h2 data-hover="Web Design" className="sliding-text-two__title">Web Design</h2></li>
          <li><h2 data-hover="Promotion" className="sliding-text-two__title">Promotion</h2></li>
        </ul>
      </div>
    </div>
  );
}
