import { Link, useLocation } from 'react-router-dom';
import { splitLangFromPath, localizePath } from '../../i18n/langRouting';

/** Drop-in replacement for react-router's <Link> that prefixes `to` with the current URL language. */
const LocalizedLink = ({ to, ...props }) => {
    const location = useLocation();
    const { lang } = splitLangFromPath(location.pathname);
    return <Link to={localizePath(lang, to)} {...props} />;
};

export default LocalizedLink;
