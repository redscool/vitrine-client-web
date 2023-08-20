import { useParams } from 'react-router-dom';
import Sky from '../components/space/page/template/Sky'
import { useEffect, useState } from 'react';
import { resource_request_with_access_token } from '../utils/Service';
import { PAGE_TEMPLATES } from '../constants';

function NotFound() {
  return (
    <div>Not Found</div>
  )
}

export default function Page() {
  const params = useParams();
  const spaceId = params.spaceId;
  const [pageData, setPageData] = useState();

  useEffect(() => {
    resource_request_with_access_token(
      'get',
      '/api/community/space/getPage',
      { id: spaceId },
      (({ data }) => {
        setPageData(data.pageData);
      }),
      console.log
    )
  }, [])

  const Template = (
    {
      [PAGE_TEMPLATES[0]]: Sky,
    }[pageData?.template] ??
    NotFound
  )

  return (
    <>
      <Template pageData={pageData} />
    </>
  )
}
