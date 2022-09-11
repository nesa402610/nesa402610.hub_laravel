import React, {FC} from 'react';
import {Route, Routes } from 'react-router-dom';
import HomePage from "./homePage";

const Index: FC = () => {
    return (
    <>
        <Routes>
            <Route path={'/'} element={<HomePage/>}/>
        </Routes>
    </>
    );
};

export default Index;