import { Routes, Route } from "react-router-dom";
import Home from "../routes/Home";
import Blog from "../routes/Blog";
import About from "../routes/About";
import Showcase from "../routes/Showcase";
import NotFound from "../routes/NotFound";

function RouteProvider() {
    return <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/about" element={<About />} />
        <Route path="/showcase" element={<Showcase />} />
        <Route path="/*" element={<NotFound />} />
    </Routes>
}

export default RouteProvider;