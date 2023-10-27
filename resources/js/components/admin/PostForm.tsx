import React, {Dispatch, FC, SetStateAction, useState} from 'react';
import Modal from "../UI/modal";
import {useCreatePostMutation, useUpdatePostMutation} from "services/postService";
import {IPost} from "types/Post";

interface PostFormProps {
    post?: IPost
    isModal: boolean
    setIsModal: Dispatch<SetStateAction<boolean>>
}

const PostForm: FC<PostFormProps> = ({post, isModal, setIsModal}) => {
    const [createPost, {}] = useCreatePostMutation()
    const [updatePost, {}] = useUpdatePostMutation()
    const [data, setData] = useState<IPost>(post || {title: '', body: '', image: ''});
    const createPostHandler = (e) => {
        e.preventDefault()
        createPost(data)
        setIsModal(false)
    }
    const updatePostHandler = (e) => {
        e.preventDefault()
        updatePost(data)
        setIsModal(false)
    }

    return (
        <Modal title={'Создание поста'} isOpen={isModal} onClose={setIsModal}>
            <div className={'block--light flex flex-col gap-4'}>
                <div className={'flex flex-col gap-4'}>
                    <label>
                        Название поста
                        <input type={'text'}
                               value={data.title}
                               onChange={e => setData({...data, title: e.target.value})}/>
                    </label>
                    <label className={'flex flex-col'}>
                        Тело поста
                        <textarea rows={5}
                                  value={data.body}
                                  onChange={e => setData({...data, body: e.target.value})}/>
                    </label>
                </div>
                {!post ?
                    <button onClick={createPostHandler}>Создать пост</button>
                    :
                    <button onClick={updatePostHandler}>Обновить пост</button>
                }
            </div>
        </Modal>
    );
};

export default PostForm;
