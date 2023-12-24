import React, { useContext, useEffect, useState } from 'react';

import Select from '../form_components/Select';
import InputField from '../form_components/InputField';
import { useNavigate, useParams } from 'react-router-dom';
import { ServiceContext } from '../../utils/context/serviceContext';
import { PAGE_TEMPLATES } from '../../constants';

export default function Page() {
	const params = useParams();
	const navigate = useNavigate();
	const spaceId = params.spaceId;

	const [template, setTemplate] = useState();
	const [heading, setHeading] = useState();
	const [subHeading, setSubHeading] = useState();
	const [profileImg, setProfileImg] = useState();
	const [banner, setBanner] = useState();
	const [gaffar, setGaffar] = useState();
	const [twitter, setTwitter] = useState();
	const [email, setEmail] = useState();
	const [highlights, setHighlights] = useState([]);
	const [description, setDescription] = useState();

	const [pageFound, setPageFound] = useState(false);

	const serviceObject = useContext(ServiceContext);
	console.log('template', template);

	useEffect(() => {
		serviceObject.request(
			'get',
			'/api/space/page/get',
			{ id: spaceId },
			({ data: { pageData } }) => {
				setTemplate(pageData.template);
				setHeading(pageData.heading);
				setSubHeading(pageData.subHeading);
				setProfileImg(pageData.profileImg);
				setBanner(pageData.banner);
				setHighlights(pageData.highlights);
				setDescription(pageData.description);
				setTwitter(pageData.socials?.twitter);
				setGaffar(pageData.socials?.gaffar);
				setEmail(pageData.socials?.email);
				setPageFound(true);
			},
			console.log
		);
	}, []);

	const addPage = () => {
		serviceObject.request(
			'post',
			'/api/space/page/create',
			{
				spaceId,
				data: {
					template,
					heading,
					subHeading,
					profileImg,
					banner,
					highlights,
					description,
					socials: {
						...(twitter && { twitter }),
						...(gaffar && { gaffar }),
						...(email && { email }),
					},
				},
			},
			console.log,
			console.log
		);
	};

	const updatePage = () => {
		serviceObject.request(
			'post',
			'/api/space/page/replace',
			{
				spaceId,
				data: {
					template,
					heading,
					subHeading,
					profileImg,
					banner,
					highlights,
					description,
					socials: {
						...(twitter && { twitter }),
						...(gaffar && { gaffar }),
						...(email && { email }),
					},
				},
			},
			console.log,
			console.log
		);
	};
	return (
		<div style={{ display: 'flex', flexDirection: 'column', width: '50%' }}>
			<Select
				options={PAGE_TEMPLATES}
				label="Template"
				selectedItem={template}
				setSelectedItem={setTemplate}
			/>
			{PAGE_TEMPLATES[template] ? (
				<>
					<InputField
						label="heading"
						state={heading}
						setState={setHeading}
					/>
					<InputField
						label="sub heading"
						state={subHeading}
						setState={setSubHeading}
					/>
					<InputField
						label="profile Image"
						state={profileImg}
						setState={setProfileImg}
					/>
					<InputField
						label="banner image"
						state={banner}
						setState={setBanner}
					/>
					<h1>Highlights</h1>
					{highlights.map((point, index) => {
						return (
							<div
								style={{
									display: 'flex',
									flexDirection: 'row',
									alignItems: 'center',
								}}
							>
								<p>•</p>
								<input
									value={point}
									onChange={(e) =>
										setHighlights((highlights) => {
											highlights[index] = e.target.value;
											return [...highlights];
										})
									}
								/>
								<button
									onClick={() =>
										setHighlights((highlights) => {
											highlights.splice(index, 1);
											return [...highlights];
										})
									}
								>
									Delete
								</button>
							</div>
						);
					})}
					<div
						onClick={() => setHighlights((highlights) => [...highlights, ''])}
					>
						Add Highlights
					</div>
					<h1>Description</h1>
					<textarea
						style={{
							minHeight: '100px',
							border: '1px solid grey',
							background: 'none',
							outline: 'none',
						}}
						contentEditable="true"
						onInput={(e) => setDescription(e.currentTarget.textContent)}
						value={description}
					/>
					<InputField
						label="gaffar"
						state={gaffar}
						setState={setGaffar}
						placeholder="https://gaffar.vercel.app/project/<ID_ONLY>"
					/>
					<InputField
						label="twitter"
						state={twitter}
						setState={setTwitter}
						placeholder="https://twitter.com/<ID_ONLY>"
					/>
					<InputField
						label="email"
						state={email}
						setState={setEmail}
					/>
					{pageFound ? (
						<div
							label={'Update Page'}
							onClick={updatePage}
						>
							Update Page
						</div>
					) : (
						<div onClick={addPage}>Add Page</div>
					)}
				</>
			) : null}
			<div onClick={() => navigate(`/page/${spaceId}`)}>Visit Page</div> :
		</div>
	);
}
