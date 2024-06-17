import React from "react";
import {
    useCreateTagMutation,
    useDeleteTagMutation,
    useGetAdminTagsQuery,
    useUpdateTagMutation
} from "services/Anime/TagService";
import List from "../../components/admin/List";
import QuickAdder from "../../components/admin/QuickAdder";
import Loader from "../../components/Loader";

const Tags = () => {
    const {data, isLoading} = useGetAdminTagsQuery();
    const [createTag, {error}] = useCreateTagMutation();
    const [updateTag] = useUpdateTagMutation();
    const [deleteTag] = useDeleteTagMutation()

    if (isLoading) return <Loader/>
    return (
        <div className={"flex flex-col gap-4"}>
            <QuickAdder createFn={createTag} error={error} length={data.total} tag/>
            <div className={'flex gap-4 justify-between'}>
                <List deleteFn={deleteTag} type={'tag'} title={'Rx теги'} data={data.tags.rx} updateFn={updateTag}/>
                <List deleteFn={deleteTag} type={'tag'} title={'FF теги'} data={data.tags.ff} updateFn={updateTag}/>
                <List deleteFn={deleteTag} type={'genre'} title={'Rx жанры'} data={data.genres.rx}
                      updateFn={updateTag}/>
                <List deleteFn={deleteTag} type={'genre'} title={'FF жанры'} data={data.genres.ff}
                      updateFn={updateTag}/>
            </div>
        </div>
    );
};

export default Tags;
