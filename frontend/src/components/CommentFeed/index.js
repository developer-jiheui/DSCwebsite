import React, { useState } from 'react';
import { Comment, Form, Icon, Button, CommentGroup } from 'semantic-ui-react';

import './index.css';

const defaultProfilePicURL = "https://media.istockphoto.com/vectors/default-profile-picture-avatar-photo-placeholder-vector-illustration-vector-id1214428300?k=6&m=1214428300&s=612x612&w=0&h=rvt5KGND3z8kfrHELplF9zmr8d6COZQ-1vYK9mvSxnc=";

const CommentWithReplies = ({ data, key }) => {
    const [openReplyForm, setOpenReplyForm] = useState(false);
    const [replyText, setReplyText] = useState("");
    const [errorsReply, setErrorsReply] = useState(false);
    
    const [upvotes, setUpvotes] = useState(0);

    const replies = (data.replies || []).map((reply, id) => {
        return <CommentGroup><CommentWithReplies key={id} data={reply} /></CommentGroup>
    })

    const submitReply = () => {
        if (replyText.length > 0) {
            if(!data.replies) {
                data.replies = [];
            }

            data.replies.push({
                name: "User Name",
                timestamp: new Date().toDateString(),
                text: replyText,
                replies: []
            });
            //TODO: save to db
            setReplyText("");
            setOpenReplyForm(false);
            setErrorsReply(false);
        } else {
            setErrorsReply(true);
        }
    }



    return (
        <Comment key={key}>
            <Comment.Avatar src={defaultProfilePicURL} />
            <Comment.Content>
                <Comment.Author as="span">
                    {data.isAdmin && <Icon name="chess queen" />}
                    {data.name}
                </Comment.Author>
                <Comment.Metadata>
                    <span>{data.timestamp}</span>
                </Comment.Metadata>
                <Comment.Text>{data.text}</Comment.Text>
                <Comment.Actions>
                    <Comment.Action onClick={() => setOpenReplyForm(!openReplyForm)}>Reply</Comment.Action>
                    <Comment.Action onClick={() => setUpvotes(upvotes + 1)}>{upvotes}<Icon name="thumbs up outline" /></Comment.Action>
                    <Comment.Action>Report <Icon name="flag outline" /></Comment.Action>
                </Comment.Actions>
                <Form reply className={openReplyForm ? "visible" : "hidden"}>
                    <Form.TextArea
                        value={replyText}
                        error={errorsReply}
                        onChange={(e) => setReplyText(e.target.value)}
                    />
                    <Button
                        content='Add Reply'
                        onClick={() => submitReply()}
                        primary
                    />
                    <Button
                        content="Cancel"
                        onClick={() => setOpenReplyForm(false)}
                    />
                </Form>
            </Comment.Content>
            {replies}
        </Comment>
    )


}

const CommentFeed = ({ centered, comments }) => {
    const [emptyComment, setEmptyComment] = useState(false);
    const [comment, setComment] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (comment === "") {
            setEmptyComment(true);
        } else {
            comments.unshift({ 
                name: "Bob", 
                timestamp: new Date().toDateString(), 
                text: comment,
                replies: []
            });
            // TODO: save to db

            setComment("");
            setEmptyComment(false);
        }
    };

    return (
        <Comment.Group threaded>
            {comments.map((c, id) =>
                <CommentWithReplies data={c} key={id} />
            )}
            <Form
                id="comment-create-form"
                reply
                onSubmit={(e) => {
                    handleSubmit(e);
                }}>
                <Form.TextArea
                    placeholder="What do you think?"
                    error={emptyComment}
                    value={comment}
                    onChange={(e) => {
                        setComment(e.target.value);
                        setEmptyComment(comment.length <= 0);
                    }}
                />
                <Button
                    content='Comment'
                    labelPosition='left'
                    icon='edit'
                    color="purple"
                />
            </Form>
        </Comment.Group>
    );
}

export default CommentFeed;