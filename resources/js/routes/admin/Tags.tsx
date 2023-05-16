import React from "react";
import {useCreateTagMutation, useGetTagsQuery, useUpdateTagMutation} from "../../services/Collections/TagService";
import List from "../../components/admin/List";
import QuickAdder from "../../components/admin/QuickAdder";

const Tags = () => {
    const {data} = useGetTagsQuery();
    const [createTag, {error}] = useCreateTagMutation();
    const [updateTag] = useUpdateTagMutation();
    return (
        <div className={"flex flex-col gap-4"}>
            <QuickAdder createFn={createTag} error={error} length={data?.length}/>
            <List data={data} updateFn={updateTag}/>
        </div>
    );
};

export default Tags;
