import React, { useEffect, useState } from 'react';

function Timer({setResign,timeUp,setTimeUp,move}) {
    const [seconds, setSeconds] = useState(30);

    useEffect(() => {
        const timer = setInterval(() => {
            setSeconds((prevSeconds) => prevSeconds - 1);
        }, 1000);

        if (seconds === 0) {
            clearInterval(timer);
            if (!move) {
                setResign('resigned');
                setTimeUp(true);
            }
            setSeconds(30);
        }

        return () => clearInterval(timer);
    }, [seconds]);

    return (
        <div className='text-white text-center flex flex-col justify-center items-center h-full uppercase'>
            <h3 className='text-sm'>time left</h3>
            <h3 className='text text-blue-400 '>{seconds}</h3>
        </div>
    );
}

export default Timer;
