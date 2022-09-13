import React, { useEffect, useState } from 'react'
import { Container, Row } from 'reactstrap'
import { ToastContainer } from "react-toastify";

import MainLayout from './layout/MainLayout'
import Multi from 'parts/Multi';
import Loading from 'components/Loading';
import MultiMenu from 'components/MultiMenu';

export default function MultiRoom(props) {
  const [layout, setLayout] = useState('6');
  const [loading, setLoading] = useState(false);
  const [hideMultiMenu, setHideMultiMenu] = useState(false)

  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 1000);
  }, [layout])

  const isMultiRoom = layout === '4' || layout === '3' ? 'isMultiRoom' : '';
  const propsMultiRoom = { hideMultiMenu, setHideMultiMenu, layout, setLayout, theme: props.theme }

  return (
    <MainLayout {...props} isMultiRoom={isMultiRoom}>
      <Container fluid>
        <ToastContainer 
          position="top-right"
          autoClose={3000} 
        />
        <MultiMenu {...propsMultiRoom} />
        <Row>
          <Multi {...propsMultiRoom} />
          <Multi {...propsMultiRoom} />
          {layout === '4' || layout == '3' ? (
            loading && layout !== '3' ? <Loading /> :
            <Multi {...propsMultiRoom} />
          ) : ''}
          {layout === '3' && (
            loading && layout !== '4' ? <Loading />  :
            <Multi {...propsMultiRoom} />
          )}
        </Row>
      </Container>
    </MainLayout>
  )
}
