import Editor from "../components/Editor";
import { useEffect, useState } from "react";
import { resource_request_webview } from "../utils/Service";
import { getVideoURL } from "../utils/Misc";
import { STREAM_TYPES } from "../constants";

export default function WebView() {
    const search = window.location.search;
    const params = new URLSearchParams(search);
    const postId = params.get('postId');
    const accessToken = params.get('accessToken');
    const refreshToken = params.get('refreshToken');
    const userId = params.get('userId');
    const height = params.get('height');
    const width = params.get('width');

    const [post, setPost] = useState();
    const [error, setError] = useState();

    useEffect(() => {
        resource_request_webview(
            'get',
            '/api/space/stream/post',
            { postId },
            ({ data }) => setPost(data),
            () => setError(true),
            accessToken,
            refreshToken,
            userId
        )
    }, [])

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
                style={{
                    ...(height && { height }),
                    ...(width && { width }),
                }}
            />
        )
    }

    return (
        <div>Loading</div>
    )
}
