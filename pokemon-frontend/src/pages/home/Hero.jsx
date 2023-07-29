import React from 'react';
// import Typed from 'react-typed';
import { TypeAnimation } from 'react-type-animation';
import '../../components/Buttons/button.css'
import { Link } from 'react-router-dom';

//bg-[url("https://64.media.tumblr.com/d0b3565eca36979c310b838da3664f5c/3404aa377c129daa-ee/s540x810/93d823a12be181c59c8bacf29559a2b1337c1f53.gif")] bg-no-repeat bg-cover

const Hero = () => {
    return (
        <div className='text-white flex flex-col justify-center items-center gap-4 p-4 h-full '>
            <div className='text-center grid grid-cols-1 gap-2 '>
                <div className='text-[#00df9a] font-bold p-2'>
                    Welcome to Pokemon Showdown
                </div>
                <div>
                <h1 className='md:text-6xl sm:text-6xl text-4xl font-bold md:py-2 bg-cover  bg-clip-text text-transparent bg-no-repeat bg-[url("https://media.giphy.com/media/cNlhpWYx5PGsOGXAil/giphy.gif")]'>
                    Master. Dominate. Conquer.
                </h1>
                </div>
                <div className='flex flex-col justify-center items-center '>
                    <p className='md:text-3xl sm:text-4xl text-lg font-bold py-4'>
                        play with over 900 unique pokemons
                    </p>
                    <TypeAnimation
                        sequence={[
                            'Strategize',
                            2000, 
                            '',
                            2000,
                            'Compete',
                            2000,
                            'Conquer',
                            2000
                        ]}
                        wrapper="span"
                        speed={20}
                        style={{ fontSize: '2em', display: 'inline-block' }}
                        repeat={Infinity}
                    />
                </div>
                {/* <p className='md:text-2xl text-xl font-bold text-gray-500'>Monitor your data analytics to increase revenue for BTB, BTC, & SASS platforms.</p> */}
            </div>
            <div className='grid md:grid-cols-3 grid-cols-1 gap-2 place-items-center w-2/3'>
                <img src='https://play.pokemonshowdown.com/sprites/ani-back/latios.gif' className='hidden md:block' />
                <Link to='/teambuilder'>
                    <button id='idt'>
                        Teambuilder
                    </button>
                </Link>
                <img src='https://play.pokemonshowdown.com/sprites/ani-back/rayquaza-mega.gif' />
            </div>
        </div>

    );
};

export default Hero;