import React from "react";
import {useCreateTagMutation, useGetTagsQuery, useUpdateTagMutation} from "services/Collections/TagService";
import List from "../../components/admin/List";
import QuickAdder from "../../components/admin/QuickAdder";
import Loader from "../../components/Loader";

const Tags = () => {
    const {data, isLoading} = useGetTagsQuery();
    const [createTag, {error}] = useCreateTagMutation();
    const [updateTag] = useUpdateTagMutation();

    if (isLoading) return <Loader/>
    const FFDataTags = data.filter(tag => tag.type === 0)
    const RxDataTags = data.filter(tag => tag.type === 1)
    const RxDataGenres = data.filter(tag => tag.type === 2)
    const FFDataGenres = data.filter(tag => tag.type === 3)
    return (
        <div className={"flex flex-col gap-4"}>
            <QuickAdder createFn={createTag} error={error} length={data?.length} tag/>
            <div className={'flex gap-4 justify-between'}>
                <List title={'Rx теги'} data={RxDataTags} updateFn={updateTag}/>
                <List title={'FF теги'} data={FFDataTags} updateFn={updateTag}/>
                <List title={'Rx жанры'} data={RxDataGenres} updateFn={updateTag}/>
                <List title={'FF жанры'} data={FFDataGenres} updateFn={updateTag}/>
            </div>
        </div>
    );
};

export default Tags;
