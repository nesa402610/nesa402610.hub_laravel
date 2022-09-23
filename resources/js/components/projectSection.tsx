import React, {FC, useEffect} from 'react';
import SiteCard from './UI/siteCard';
import axios from "axios";
import {useTypedSelector} from "../hooks/useTypedSelector";
import {useDispatch} from "react-redux";
import {getProjectsAction} from "../store/homePageReducer";


const ProjectSection: FC = () => {
    const projects = useTypedSelector(state => state.homePage.projects)
    const dispatch = useDispatch()

    useEffect(()=> {
        axios.get('/projects').then(r => dispatch(getProjectsAction(r.data)))
    }, [])
    return (
        <section>
            <h2 className={'text-3xl font-bold text-center mb-8'}>Проекты</h2>
            <div className={'grid lg:grid-cols-4 sm:grid-cols-2 2xl:grid-cols-5 md:grid-cols-3 gap-4 px-4'}>
                {projects.map(project =>
                    <SiteCard key={project.name} project={project}/>
                )}
            </div>
        </section>
    );
};

export default ProjectSection;
