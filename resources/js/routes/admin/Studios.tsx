import React from "react";
import {useCreateStudioMutation, useGetAllStudiosQuery, useUpdateStudioMutation} from "services/Anime/StudioService";
import List from "../../components/admin/List";
import QuickAdder from "../../components/admin/QuickAdder";

const Studios = () => {
    const {data} = useGetAllStudiosQuery("");
    const [updateStudio] = useUpdateStudioMutation();
    const [createStudio, {error}] = useCreateStudioMutation();
    return (
        <div className={"flex flex-col gap-4"}>
            <QuickAdder length={data?.length} error={error} createFn={createStudio}/>
            <List data={data} updateFn={updateStudio}/>
        </div>
    );
};

export default Studios;
