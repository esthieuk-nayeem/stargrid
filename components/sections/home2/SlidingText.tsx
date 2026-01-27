

export default function SlideingText() {
  return (
    <section className="sliding-text overflow-hidden">
      <div className="sliding-text__wrap flex whitespace-nowrap">
        {/* First list */}
        <ul className="sliding-text__list list-unstyled flex animate-marquee">
          <li>
            <h2 data-hover="Front end Development" className="sliding-text__title">
              Front end Development
            </h2>
            <span></span>
          </li>
          <li>
            <h2 data-hover="UI/UX Design" className="sliding-text__title">
              UI/UX Design
            </h2>
            <span></span>
          </li>
          <li>
            <h2 data-hover="Product Design" className="sliding-text__title">
              Product Design
            </h2>
            <span></span>
          </li>
          <li>
            <h2 data-hover="Digital Marketing" className="sliding-text__title">
              Digital Marketing
            </h2>
            <span></span>
          </li>
          <li>
            <h2 data-hover="Website Design" className="sliding-text__title">
              Website Design
            </h2>
            <span></span>
          </li>
          <li>
            <h2 data-hover="APP Development" className="sliding-text__title">
              APP Development
            </h2>
            <span></span>
          </li>
        </ul>

        {/* Duplicate for seamless infinite loop */}
        <ul
          className="sliding-text__list list-unstyled flex animate-marquee"
          aria-hidden="true"
        >
          <li>
            <h2 data-hover="Front end Development" className="sliding-text__title">
              Front end Development
            </h2>
            <span></span>
          </li>
          <li>
            <h2 data-hover="UI/UX Design" className="sliding-text__title">
              UI/UX Design
            </h2>
            <span></span>
          </li>
          <li>
            <h2 data-hover="Product Design" className="sliding-text__title">
              Product Design
            </h2>
            <span></span>
          </li>
          <li>
            <h2 data-hover="Digital Marketing" className="sliding-text__title">
              Digital Marketing
            </h2>
            <span></span>
          </li>
          <li>
            <h2 data-hover="Website Design" className="sliding-text__title">
              Website Design
            </h2>
            <span></span>
          </li>
          <li>
            <h2 data-hover="APP Development" className="sliding-text__title">
              APP Development
            </h2>
            <span></span>
          </li>
        </ul>
      </div>
    </section>
  );
}
