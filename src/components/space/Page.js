import React, { useEffect, useState } from 'react'
import Button from '../form/Button'
import Textbox from '../form/Textbox'
import Select from '../form/Select';
import { PAGE_TEMPLATES } from '../../constants';
import { resource_request_with_access_token } from '../../utils/Service';
import { useNavigate, useParams } from 'react-router-dom';

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

  useEffect(() => {
    resource_request_with_access_token(
      'get',
      '/api/space/page/get',
      { id: spaceId },
      (({ data: { pageData } }) => {
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
      }),
      console.log
    )
  }, [])

  const addPage = () => {
    resource_request_with_access_token(
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
        }
      },
      console.log,
      console.log,
    )
  }

  const updatePage = () => {
    resource_request_with_access_token(
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
        }
      },
      console.log,
      console.log,
    )
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '50%' }}>
      <Select
        options={PAGE_TEMPLATES}
        label="Template"
        selectedItem={template}
        setSelectedItem={setTemplate}
      />
      {
        template ?
          <>
            <Textbox
              label="heading"
              state={heading}
              setState={setHeading}
            />
            <Textbox
              label="sub heading"
              state={subHeading}
              setState={setSubHeading}
            />
            <Textbox
              label="profile Image"
              state={profileImg}
              setState={setProfileImg}
            />
            <Textbox
              label="banner image"
              state={banner}
              setState={setBanner}
            />
            <h1>Highlights</h1>
            {
              highlights.map((point, index) => {
                return (
                  <div style={{ display: 'flex', flexDirection: 'row', alignItems: "center" }}>
                    <p>•</p>
                    <input
                      value={point}
                      onChange={(e) => setHighlights(highlights => {
                        highlights[index] = e.target.value;
                        return [...highlights];
                      })}
                    />
                    <button onClick={() => setHighlights(highlights => {
                      highlights.splice(index, 1);
                      return [...highlights];
                    })}>Delete</button>
                  </div>
                )
              })}
            <Button label={"Add Highlights"} handleClick={() => setHighlights(highlights => [...highlights, ""])} />
            <h1>Description</h1>
            <div style={{ minHeight: "100px", border: "1px solid grey" }} contentEditable="true" onInput={e => setDescription(e.currentTarget.textContent)}>
              {description}
            </div>
            <Textbox
              label="gaffar"
              state={gaffar}
              setState={setGaffar}
              placeholder='https://gaffar.vercel.app/project/<ID_ONLY>'
            />
            <Textbox
              label="twitter"
              state={twitter}
              setState={setTwitter}
              placeholder='https://twitter.com/<ID_ONLY>'
            />
            <Textbox
              label="email"
              state={email}
              setState={setEmail}
            />
            {
              pageFound ?
                <Button label={"Update Page"} handleClick={updatePage} /> :
                <Button label={"Add Page"} handleClick={addPage} />
            }
          </>
          : null
      }
      <Button label={"Visit Page"} handleClick={() => navigate(`/page/${spaceId}`)} /> :
    </div>
  )
}
