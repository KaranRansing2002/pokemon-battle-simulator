import React from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    backgroundColor : '#121212',
    border: '2px solid #000',
    boxShadow: 24,
};

const GameEnd = ({open,setOpen,winner,message,user,setRoom}) => {
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        setRoom(undefined)
    }

    return (
        <div>
            {/* <Button onClick={handleOpen}>Open modal</Button> */}
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <div style={style}>
                    <div className='grid place-items-center gap-2 text-white'>
                        <h2 className={`uppercase text-${winner===user ? 'green-400' : 'red-800'} text-3xl`}>{winner===user ? 'you won!' : 'you lost!'}</h2>
                        <h3>{message}</h3>
                        <div className='p-4'>
                            <img className='h-[250px] min-w-[350px]' src={winner===user ? 'https://64.media.tumblr.com/d0b3565eca36979c310b838da3664f5c/3404aa377c129daa-ee/s540x810/93d823a12be181c59c8bacf29559a2b1337c1f53.gif' : 'https://pa1.aminoapps.com/6221/57e59b76e0d5998e05065fc14518f2522206aa29_hq.gif'} />
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    );
}

export default GameEnd
