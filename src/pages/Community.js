import { useEffect, useState } from "react"
import { resource_request_with_access_token } from "../utils/Service";
import { useNavigate } from "react-router-dom";

export default function Community() {
    const SEARCH_REQUEST_INTERVAL = 500;
    const [searchResults, setSearchResults] = useState([]);
    const [searchText, setSearchText] = useState("")
    const [currentRequest, setCurrentRequest] = useState(false)
    const [nextRequest, setNextRequest] = useState()

    const navigate = useNavigate();

    const search = (query) => {
        setCurrentRequest(true);
        resource_request_with_access_token(
            'get',
            '/api/community/space/searchPage',
            { query },
            ({ data }) => {
                setCurrentRequest(false);
                setSearchResults(data.pages.hits);
            },
            (err) => {
                console.log(err);
                setCurrentRequest(false);
            }
        )
    }
    
    useEffect(() => {
        if (currentRequest || nextRequest ) {
            if (nextRequest) {
                clearTimeout(nextRequest);
            }

            const eventId = setTimeout(() => {
                search(searchText);
            }, SEARCH_REQUEST_INTERVAL);

            setNextRequest(eventId);
        } else {
            const eventId = setTimeout(() => {
                search(searchText);
            }, SEARCH_REQUEST_INTERVAL);

            setNextRequest(eventId);
        }
    }, [searchText])

    return (
        <div>
            <input value={searchText} onChange={(e) => { setSearchText(e.target.value) }} />
            {searchResults.map(search =>
                <p onClick={() => navigate(`/page/${search.id}`)} style={{border: '2px solid black', cursor: 'pointer', margin: '20px'}}>{JSON.stringify(search, null, 2)}</p>
            )}
        </div>
    )
}
