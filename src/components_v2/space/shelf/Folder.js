import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { ServiceContext } from '../../../utils/context/serviceContext'; 

export default function Folder() {
	const { folderId } = useParams();
	const serviceObject = useContext(ServiceContext);
	const [files, setFiles] = useState([])

	useEffect(() => {
		async function getFiles() {
			serviceObject.request(
				'get',
				'/api/space/shelf/getFiles',
				{
					folderId
				},
				({ data }) => {
					setFiles(data.data);
				},
				console.log
			);
		}
		getFiles();
	}, []);
	return <><div>Folder</div> </>
}
