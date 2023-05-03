import React, {useState} from 'react';
import {useParams} from "react-router";
import moment from "moment";
import {BiTime} from "react-icons/bi";
import CreateComment from "./CreateComment";
import {Link} from "react-router-dom";
import CommentEdit from "../../components/Comment__edit";
import {useGetPostByIdQuery, useGetPostCommentsQuery, useUpdateCommentMutation} from "../../services/postService";

const BlogPostPage = () => {
    const [updateComment, {}] = useUpdateCommentMutation()
    const {id} = useParams()
    const {data: post} = useGetPostByIdQuery(id)
    const {data: comments} = useGetPostCommentsQuery(id)
    const [comment, setComment] = useState<string>('');
    const [isEdit, setIsEdit] = useState<number>(0);

    const saveComment = (id) => {
        updateComment({id, comment})
            .then(() => setIsEdit(0))
            .catch(err => console.log(err))
    };

    return (
        <div className={'mx-4 flex flex-col gap-4'}>
            <div className={'block--light sm:flex-col'}>
                <div>{post?.title}</div>
                <div>
                    {post?.body}
                </div>
                <div className={'flex justify-end'}>
                        <span className={'flex items-center gap-1'}>
                            {moment(post?.created_at).format('DD.MM.YYYY')}
                            <BiTime className={'text-lg'}/>
                        </span>
                </div>
            </div>
            <h2 className={'text-xl font-bold text-center'}>Комментарии</h2>
            {comments?.map(c =>
                <div key={c.id} className={'block--light sm:flex-col relative'}>
                    <CommentEdit id={c.id} postId={id} body={c.body} setComment={setComment} setIsEdit={setIsEdit}/>
                    <div className={'flex gap-4 items-center'}>
                        <Link to={'/profile/' + c.user_id}
                              className={'hover:text-stone-400 transition-colors'}
                        >
                            <span>#{c.id}&nbsp;</span>
                            <span>{c.user.name}&nbsp;</span>
                            <span>{c.user.lastName}</span>
                        </Link>
                        {
                            c.created_at != c.updated_at && <span className={'italic text-stone-500'}>изменен</span>
                        }
                    </div>
                    <div>
                        {isEdit !== c.id ?
                            <div>
                                {c.body}
                            </div>
                            :
                            <div className={'flex flex-col gap-4'}>
                                <input className={'bg-stone-500'}
                                       type={'text'}
                                       value={comment}
                                       onChange={e => setComment(e.target.value)}/>
                                <button onClick={() => saveComment(c.id)}>Сохранить</button>
                            </div>
                        }
                    </div>
                </div>
            )}
            <CreateComment
                post={post}
            />
        </div>
    );
};

export default BlogPostPage;
