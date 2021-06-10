import axios from 'axios';
import { Col } from 'reactstrap';
import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";

import Menu from 'components/Menu';
import Stream from 'pages/streaming/Stream';
import Title from 'components/Title';
import Profile from 'components/Profile';
import RoomList from 'components/RoomList';
import LiveChat from 'components/Comment';
import Setlist from 'components/Setlist';
import StageUser from 'components/StageUser';
import TotalRank from 'components/TotalRank';
import Gift from 'components/Gift';
import Loading from 'components/Loading';  

export default function Multi() {
  let { id } = useParams();
  const [url, setUrl] = useState([]);
  const [roomId, setRoomId] = useState(id);
  const [menu, setMenu] = useState('room');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios.get(`/streaming_url?room_id=${roomId}`).then(res => {
      const streamUrl = res.data.streaming_url_list
      setUrl(streamUrl)
    });
    !url && setMenu('room')
  }, [roomId, url])

  useEffect(() => {
    window.document.title = 'JKT48 SHOWROOM'
    menu == 'room' && window.scrollTo(0, 0);

    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 1000);
  }, [menu, roomId])

  useEffect(() => {
    id === 'undefined' && setRoomId('332503');
  }, [id])

  return (
    <Col lg="6">
      {url ? url.slice(0, 1).map((item, idx) => (
        <>
          <Stream key={idx} url={item.url} />
          <Title roomId={roomId} />
        </>
      )) : !url ? (
        <Profile roomId={roomId} setRoomId={setRoomId} isLoad={loading} menu={menu} />
      ) : (
        <Stream url="" />
      )}
      
      <Menu setMenu={setMenu} isLive={url} roomId={roomId} />
      {menu === 'room' ? (
        <RoomList setRoomId={setRoomId} />
      ) : menu === 'chat' ? (
        loading ? <Loading /> :
        <LiveChat roomId={roomId} />
      ) : menu === 'rank' ? (
        loading ? <Loading /> :
        <StageUser roomId={roomId} />
      ) : menu === 'gift' ? (
        loading ? <Loading /> :
        <Gift roomId={roomId} />
      ) : menu === 'total' ? (
        loading ? <Loading /> :
        <TotalRank roomId={roomId} />
      ): (
        <Setlist />
      )}
    </Col>
  )
}

