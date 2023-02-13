import React, {FC} from 'react';
import {Outlet} from "react-router-dom";

const BlogPage: FC = () => {
    return (
        <section>
            <Outlet/>
        </section>
    );
}

export default BlogPage;
