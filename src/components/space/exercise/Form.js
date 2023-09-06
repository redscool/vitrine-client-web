import { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";
import { resource_request_with_access_token } from '../../../utils/Service';
import { FORM_ENTITY_TYPES } from '../../../constants';
import Editor from '../../Editor';
import config from "../../../config.json";
import ShelfPopUp from '../../ShelfPopUp';
import Button from '../../form/Button';
import { useSelector } from 'react-redux';
import { authKeySelector } from '../../../redux/authReducer';

const FILE_SERVER = config.FILE_SERVER;

function McqForm({ addResponse, entity }) {
    const [key, value] = entity;

    return (
        <div>
            <Editor defaultContent={value?.content} readOnly />
            {value?.options?.map?.((option, index) => {
                return (
                    <label>
                        <p>{option} <input name={key} type='radio' onChange={() => addResponse(key, index)} /></p>
                    </label>
                )
            })}
        </div>
    )
}

function ShortForm({ addResponse, entity }) {
    const [key, value] = entity;

    return (
        <div>
            <Editor defaultContent={value?.content} readOnly />
            <input onChange={e => addResponse(key, e.target.value)} />
        </div>
    )
}

function LongForm({ addResponse, entity }) {
    const [key, value] = entity;

    return (
        <div>
            <Editor defaultContent={value?.content} readOnly />
            <textarea onChange={e => addResponse(key, e.target.value)} />
        </div>
    )
}

function FileForm({ addResponse, entity }) {
    const [key, value] = entity;
    const [showPopup, setShowPopup] = useState(false)
    const [file, setFile] = useState()

    const handleSubmit = (file) => {
        const url = `${FILE_SERVER}/getFile?id=${file.url}`;
        setFile(url);
        addResponse(key, url);
        setShowPopup(false);
    };

    return (
        <>
            {showPopup ? <ShelfPopUp addFile={handleSubmit} setPopUp={setShowPopup} /> : null}
            <div>
                <Editor defaultContent={value?.content} readOnly />
                <img src={file} alt='demo' />
                <Button handleClick={() => setShowPopup(true)} label="upload" />
            </div>
        </>
    )
}

export default function Form() {
    const params = useParams();
    const formId = params.formId;
    const userId = useSelector(authKeySelector("userId"));

    const [entities, setEntities] = useState({});
    const [responses, setResponses] = useState({});

    const addResponse = (key, value) => {
        setResponses(pre => ({ ...pre, [key]: value }));
    }

    useEffect(() => {
        resource_request_with_access_token(
            "get",
            "/api/space/form/getformbyid",
            { formId },
            (response) => {
                const { formData } = response.data;
                setEntities(Object.entries(formData?.entities ?? {}).sort((a, b) => a[1].index - b[1].index));
            },
            console.log
        );
    }, []);

    const submit = () => {
        resource_request_with_access_token(
            "post",
            "/api/space/form/submitForm",
            { userId, formId, formResponse: responses },
            console.log,
            console.log
        );
    }

    return (
        <div>
            {entities?.map?.(entity => {
                const [key, value] = entity;
                const entityType = value?.type;
                return <div key={key}>
                    {
                        {
                            [FORM_ENTITY_TYPES.MCQ]: <McqForm entity={entity} addResponse={addResponse} />,
                            [FORM_ENTITY_TYPES.SHORT]: <ShortForm entity={entity} addResponse={addResponse} />,
                            [FORM_ENTITY_TYPES.LONG]: <LongForm entity={entity} addResponse={addResponse} />,
                            [FORM_ENTITY_TYPES.FILE]: <FileForm entity={entity} addResponse={addResponse} />,
                        }[entityType] ?? null
                    }
                    <div>---------------------------------------------------------------------------------------</div>
                </div>
            })}

            <Button handleClick={submit} label="submit" />

        </div>
    )
}
