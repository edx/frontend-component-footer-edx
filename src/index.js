import Footer, { EVENT_NAMES } from './components/Footer';
import StudioFooter from './components/studio-footer';
import FooterSlot from './plugin-slots/FooterSlot';
import StudioFooterSlot from './plugin-slots/StudioFooterSlot';
import messages from './i18n/index';

// preserving sub export footer to match with all of v5 release.
export {
  Footer,
  messages,
  EVENT_NAMES,
  StudioFooter,
  FooterSlot,
  StudioFooterSlot,
};
export default Footer;
