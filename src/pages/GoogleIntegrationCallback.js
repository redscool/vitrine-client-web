import React, {useContext, useState, useEffect} from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import queryString from 'query-string';
import { ServiceContext } from '../utils/context/serviceContext';
export default function GoogleIntegrationCallback() {
    const serviceObject = useContext(ServiceContext)
  useEffect(() => {
    async function Hello() {
        const {code} = queryString.parse(window.location.search);
      await serviceObject.request('post', '/api/integration/google/updateGoogleRefreshToken', { code }, (response) => {
      },() => undefined)
        window.close()
    }
    Hello()
  }, []);

  return (
    <div>GoogleIntegrationCallback</div>
  )
}
