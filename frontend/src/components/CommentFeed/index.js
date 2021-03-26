import React, { useState } from 'react';
import { Comment, Form, Icon, Button, CommentGroup } from 'semantic-ui-react';

import './index.css';

const defaultProfilePicURL = "https://media.istockphoto.com/vectors/default-profile-picture-avatar-photo-placeholder-vector-illustration-vector-id1214428300?k=6&m=1214428300&s=612x612&w=0&h=rvt5KGND3z8kfrHELplF9zmr8d6COZQ-1vYK9mvSxnc=";

const CommentWithReplies = ({ data, key }) => {

    const replies = (data.replies || []).map((reply, id ) => {
        return <CommentGroup><CommentWithReplies key={id} data={reply} /></CommentGroup>
    })
    
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
                    <Comment.Action>Reply</Comment.Action>
                    <Comment.Action>0 <Icon name="thumbs up outline" /></Comment.Action>
                    <Comment.Action>Report <Icon name="flag outline" /></Comment.Action>
                </Comment.Actions>
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
            setComment("");
            comments.unshift({ name: "Bob", timestamp: new Date().toDateString(), text: comment });
            setEmptyComment(false);
        }
    };

    return (
        <Comment.Group threaded>
            {comments.map((c, id) =>
                <CommentWithReplies data={c} key={id}/>
            )}
            <Form
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