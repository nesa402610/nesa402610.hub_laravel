import React, {FC, useState} from 'react';
import BgCard from "../bgCard";
import Input from "../UI/input";
import {IPost} from "../../types/types";
import FgCard from "../fgCard";
import SubmitButton from "../UI/submitButton";
import axios from "axios";
import {addPostActions} from "../../store/reducers/blogReducer";
import {useDispatch} from "react-redux";

const PostForm: FC = () => {
    const dispatch = useDispatch()
    const [post, setPost] = useState<IPost>({
        created_at: "",
        updated_at: "",
        title: '', body: '', image: ''
    });
    const createPost = (e) => {
        e.preventDefault()
        axios.post('/admin/createBlogPost', post)
            .then(r => {
                dispatch(addPostActions(r.data))
                console.log(r.data)
            })
    }
    return (
        <BgCard>
            <FgCard className={'flex flex-col gap-4'}>
                <div className={'flex flex-col gap-4'}>
                    <label>
                        Название поста
                        <Input type={'text'}
                               value={post.title}
                               onChange={e => setPost({...post, title: e.target.value})}/>
                    </label>
                    <label>
                        Тело поста
                        <Input type={'text'}
                               value={post.body}
                               onChange={e => setPost({...post, body: e.target.value})}/>
                    </label>
                </div>
                <SubmitButton onClick={createPost}>Создать пост</SubmitButton>
            </FgCard>
        </BgCard>
    );
};

export default PostForm;
