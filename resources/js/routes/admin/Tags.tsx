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
    const RxData = data.filter(tag => tag.type === 1)
    const FFData = data.filter(tag => tag.type === 0)
    console.log(RxData)
    return (
        <div className={"flex flex-col gap-4"}>
            <QuickAdder createFn={createTag} error={error} length={data?.length} tag/>
            <div className={'flex gap-4 justify-between'}>
                <List data={RxData} updateFn={updateTag}/>
                <List data={FFData} updateFn={updateTag}/>
            </div>
        </div>
    );
};

export default Tags;
