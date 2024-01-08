import Editor from "../components/Editor";
import { useState } from "react";
import { resource_request_webview } from "../utils/Service";
import { getVideoURL } from "../utils/Misc";
import { STREAM_TYPES } from "../constants";

export default function WebView() {
    const search = window.location.search;
    const params = new URLSearchParams(search);
    const postId = params.get('postId');
    const accessToken = params.get('accessToken');

    const [post, setPost] = useState();
    const [error, setError] = useState();

    resource_request_webview(
        'get',
        '/api/space/stream/post',
        { postId },
        ({ data }) => setPost(data),
        () => setError(true),
        accessToken
    )

    if (error) {
        return (
            <div>
                Session Timed Out.
                <br />
                Please Restart App.
            </div>
        )
    }

    if (post?.type === STREAM_TYPES.EDITOR) {
        return (
            <Editor
                editorContent={post.editor}
                readOnly
            />
        )
    }

    if (post?.type === STREAM_TYPES.VIDEO) {
        return (
            <video
                src={getVideoURL(post.file.url)}
                autoPlay={false}
                controls
            />
        )
    }

    return (
        <div>Loading</div>
    )
}
