import React, {FC, useEffect, useState} from 'react';
import Input from "../UI/input";
import {IPost} from "../../types/types";
import SubmitButton from "../UI/submitButton";
import axios from "axios";
import {addPost, editPost} from "../../store/reducers/blogSlice";
import {closeModal} from "../../store/reducers/modalSlice";
import {useAppDispatch} from "../../hooks/redux";

interface PostFormProps {
    post?: IPost
}

const PostForm: FC<PostFormProps> = ({post}) => {
    const dispatch = useAppDispatch()
    const [data, setData] = useState<IPost>({
        title: '', body: '', image: ''
    });
    useEffect(() => {
        if (post) setData(post)
    }, [])
    const createPost = (e) => {
        e.preventDefault()
        axios.post('/admin/createBlogPost', data)
            .then(r => {
                dispatch(addPost(r.data))
            })
            .then(() => dispatch(closeModal()))
    }

    const updatePost = (e) => {
        e.preventDefault()
        axios.post('/admin/updateBlogPost', data)
            .then(r => {
                dispatch(editPost(r.data))
            })
            .then(() => dispatch(closeModal()))
    };

    return (
        <div className={'block--darker'}>
            <div className={'block--lighter flex flex-col gap-4'}>
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
            </div>
        </div>
    );
};

export default PostForm;
