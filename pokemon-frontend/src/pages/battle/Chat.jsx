import React from 'react'

const Chat = ({ messages, user }) => {
    return (
        <div className='flex flex-col flex-grow h-80 '>
            <div className='flex flex-col gap-2 p-2 h-full overflow-y-auto flex-grow'>
            {
                messages.map((x, ind) => (
                    <div className='flex text-white gap-2' key={ind}>
                        <h3 className={`text-${user === x.user ? 'blue-400' : 'green-400'} font-bold`}>{x.user}:</h3>
                        <h3>{x.message}</h3>
                    </div>
                ))
                }
            </div>
        </div>
    )
}

export default Chat
// max-h-56 overflow-y-scroll