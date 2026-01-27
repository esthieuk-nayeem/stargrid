import CsTimer from "@/components/elements/CsTimer";
import FullHeightWrapper from "@/components/elements/FullHeightWrapper";


export default function ComingSoon() {
    

    return (
        <FullHeightWrapper className="coming-soon-page full-height">
            <div className="coming-soon-page__bg"
                style={{ backgroundImage: "url(/assets/images/backgrounds/coming-soon-page-bg.jpg)" }}></div>
            <div className="coming-soon-page__content">
                <div className="inner">
                    <div className="big-title">We&apos;re Coming Soon...</div>
                    <div className="timer-box clearfix">
                        <div className="countdown-timer">
                            <div className="default-coundown">
                                <div className="box">
                                    <CsTimer/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="text">
                        <p>
                            Website is under construction. We&apos;ll be here soon with new<br />
                            awesome site, Subscribe to be notified.
                        </p>
                    </div>
                    <div className="coming-soon-page__subscribe-box">
                        <form className="subscribe-form" action="#">
                            <input placeholder="Enter your email address" type="email" />
                            <button type="submit" className="thm-btn coming-soon-page__btn">Send Massage<span
                                    className="icon-right-arrow"></span></button>
                        </form>
                    </div>
                </div>
            </div>
        </FullHeightWrapper>
    )
}
