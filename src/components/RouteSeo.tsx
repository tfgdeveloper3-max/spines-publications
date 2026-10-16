import { useLocation } from "react-router-dom";
import Seo from "../components/Seo";
import { seo } from "../lib/Seo";

const pages = Object.values(seo);

const RouteSeo = () => {
    const { pathname } = useLocation();
    const clean = pathname !== "/" ? pathname.replace(/\/+$/, "") : "/";
    const data = pages.find((p) => p.path === clean) ?? seo.home;

    return <Seo {...data} />;
};

export default RouteSeo;