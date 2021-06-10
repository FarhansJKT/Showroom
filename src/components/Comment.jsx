import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { Card } from 'reactstrap';
import Fade from 'react-reveal/Fade';

export default function Comment({roomId}) {
  const [comment, setComment] = useState([{
    name: 'Minzoid ',
    comment: 'Tunggu wots',
    avatar_url: "https://image.showroom-cdn.com/showroom-prod/image/avatar/1028686.png?v=87"
  }]);

  useEffect(() => {
    axios.get(`/comment_log?room_id=${roomId}`).then(res => {
      const comments = res.data.comment_log
      setComment(comments)
    });
  }, [comment]);

  return (
    <Card body inverse color="dark" className="scroll">
      {comment.map((item, idx) => (
        item.comment.length != '2' && item.comment.length != '1' && 
        <Fade>
          <h5 key={idx} className="text-gray-200">
            <img width="30" className="mr-2" src={item.avatar_url} alt={item.name} />
            {item.name}
          </h5>
          <p>{item.comment}</p>
          <hr/>
        </Fade>
      ))}
    </Card>
  )
}
