import React, { useEffect, useState } from 'react'
import SendIcon from '@mui/icons-material/Send';
import { Button } from '@mui/material';
import io from 'socket.io-client'

// const socket= io.connect("http://localhost:8000")

function Chat({roomid,socket}) {

    const [message, setMessage] = useState('');
    const [messageList, setMessageList] = useState([]);

    const handleMessage = async(e) => {
        e.preventDefault();
        await socket.emit("send_message", { username: username, message: message, roomid : roomid });
        setMessageList([...messageList, message]);
        setMessage('');
    }

    useEffect(() => {
       if(roomid !== "") socket.emit("join_room",roomid) 
    },[])

    useEffect(() => {
        socket.on("receive_message", (data) => {
            console.log(data);
            setMessageList((state)=>[...state, data]);
        })
        return () => socket.off('receive_message');
    },[socket])

    const {username} = JSON.parse(localStorage.getItem('userinfo'))

  return (
    <div className='h-[95%] w-full flex'>
      <div className='h-[95%] w-full mt-12 m-8 bg-[#212121] border-2 border-black flex flex-col items-center'>
        <div className='h-42 w-[98%] m-2 border-black border-2 flex-1'>
          {
            messageList.map((mes,index)=>{
                return <div key={index} className='text-white m-2'><span className={`text-${mes.username ? 'green' : 'blue'}-400 mr-2`}>{mes.username ? mes.username : username}:</span>{mes.message ? mes.message : mes}</div>
            })
          }
        </div>
        <div className='h-auto w-full'>
          <form className='h-42 w-full flex items-center self-place-end' onSubmit={(e)=>handleMessage(e)}>
            <input placeholder='enter message' value={message} onChange={(e)=>setMessage(e.target.value)} className='border-black border-2 m-2 w-[80%]'></input>
            <Button onClick={handleMessage} variant="outlined" endIcon={<SendIcon />}>
              Send
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Chat
