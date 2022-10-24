import React, {FC, useEffect, useState} from 'react';
import BgCard from "../bgCard";
import Input from "../UI/input";
import {IPost} from "../../types/types";
import FgCard from "../fgCard";
import SubmitButton from "../UI/submitButton";
import axios from "axios";
import {addPostActions, editPostActions} from "../../store/reducers/blogReducer";
import {useDispatch} from "react-redux";
import {closeModalAction} from "../../store/reducers/modalReducer";

interface PostFormProps {
    post?: IPost
}

const PostForm: FC<PostFormProps> = ({post}) => {
    const dispatch = useDispatch()
    const [data, setData] = useState<IPost>({
        created_at: "",
        updated_at: "",
        title: '', body: '', image: ''
    });
    useEffect(() => {
        if (post) setData(post)
    }, [])
    const createPost = (e) => {
        e.preventDefault()
        axios.post('/admin/createBlogPost', data)
            .then(r => {
                dispatch(addPostActions(r.data))
            })
            .then(() => dispatch(closeModalAction()))
    }

    const updatePost = (e) => {
        e.preventDefault()
        axios.post('/admin/updateBlogPost', data)
            .then(r => {
                dispatch(editPostActions(r.data))
            })
            .then(() => dispatch(closeModalAction()))
    };

    return (
        <BgCard>
            <FgCard className={'flex flex-col gap-4'}>
                <div className={'flex flex-col gap-4'}>
                    <label>
                        Название поста
                        <Input type={'text'}
                               value={data.title}
                               onChange={e => setData({...data, title: e.target.value})}/>
                    </label>
                    <label>
                        Тело поста
                        <Input type={'text'}
                               value={data.body}
                               onChange={e => setData({...data, body: e.target.value})}/>
                    </label>
                </div>
                {!post ?
                    <SubmitButton onClick={createPost}>Создать пост</SubmitButton>
                    :
                    <SubmitButton onClick={updatePost}>Обновить пост</SubmitButton>
                }
            </FgCard>
        </BgCard>
    );
};

export default PostForm;
