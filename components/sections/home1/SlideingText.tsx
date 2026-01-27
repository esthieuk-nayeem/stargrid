

export default function SlideingText() {
  return (
    <section className="sliding-text-three overflow-hidden">
      <div className="sliding-text-three__wrap flex whitespace-nowrap">
        {/* Original List */}
        <ul className="sliding-text-three__list list-unstyled flex animate-marquee">
          <li>
            <h2 data-hover="UI/UX Design" className="sliding-text-three__title">UI/UX Design</h2>
            <span className="icon-star"></span>
          </li>
          <li>
            <h2 data-hover="Product Design" className="sliding-text-three__title">Product Design</h2>
            <span className="icon-star"></span>
          </li>
          <li>
            <h2 data-hover="Web Development" className="sliding-text-three__title">Web Development</h2>
            <span className="icon-star"></span>
          </li>
          <li>
            <h2 data-hover="Branding" className="sliding-text-three__title">Branding</h2>
            <span className="icon-star"></span>
          </li>
          <li>
            <h2 data-hover="Cyber Security" className="sliding-text-three__title">Cyber Security</h2>
            <span className="icon-star"></span>
          </li>
          <li>
            <h2 data-hover="Website Design" className="sliding-text-three__title">Website Design</h2>
            <span className="icon-star"></span>
          </li>
          <li>
            <h2 data-hover="Digital Marketing" className="sliding-text-three__title">Digital Marketing</h2>
            <span className="icon-star"></span>
          </li>
          <li>
            <h2 data-hover="UI/UX Design" className="sliding-text-three__title">UI/UX Design</h2>
            <span className="icon-star"></span>
          </li>
        </ul>

        {/* Duplicate List for Infinite Loop */}
        <ul
          className="sliding-text-three__list list-unstyled flex animate-marquee"
          aria-hidden="true"
        >
          <li>
            <h2 data-hover="UI/UX Design" className="sliding-text-three__title">UI/UX Design</h2>
            <span className="icon-star"></span>
          </li>
          <li>
            <h2 data-hover="Product Design" className="sliding-text-three__title">Product Design</h2>
            <span className="icon-star"></span>
          </li>
          <li>
            <h2 data-hover="Web Development" className="sliding-text-three__title">Web Development</h2>
            <span className="icon-star"></span>
          </li>
          <li>
            <h2 data-hover="Branding" className="sliding-text-three__title">Branding</h2>
            <span className="icon-star"></span>
          </li>
          <li>
            <h2 data-hover="Cyber Security" className="sliding-text-three__title">Cyber Security</h2>
            <span className="icon-star"></span>
          </li>
          <li>
            <h2 data-hover="Website Design" className="sliding-text-three__title">Website Design</h2>
            <span className="icon-star"></span>
          </li>
          <li>
            <h2 data-hover="Digital Marketing" className="sliding-text-three__title">Digital Marketing</h2>
            <span className="icon-star"></span>
          </li>
          <li>
            <h2 data-hover="UI/UX Design" className="sliding-text-three__title">UI/UX Design</h2>
            <span className="icon-star"></span>
          </li>
        </ul>
      </div>
    </section>
  );
}
