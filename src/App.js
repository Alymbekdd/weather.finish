import { useEffect, useState, useRef } from 'react';
import './App.css';
import axios from 'axios';
import NET from 'vanta/dist/vanta.clouds.min'
import * as THREE from 'three'

import icon from "./img/city-town-urban-solid-icon-illustration-logo-template-suitable-for-many-purposes-free-vector-removebg-preview (1).png";
import earth from "./img/earth_icon_188005-removebg-preview.png";
import speed from "./img/istockphoto-1462617826-170x170-removebg-preview (2).png";
import cloud from "./img/cloud-sun-fog-icon-vector-260nw-1455835742-removebg-preview.png";
import temper from "./img/temperature-thermometer-icon-free-vector-removebg-preview.png"



function App() {
    const KEY = '7fc5723d726846282377a40ecacbe8fc'
    const [name, setName] = useState('')
    const [weather, setWeather] = useState([])

    const [vantaEffect, setVantaEffect] = useState(0);
    const myRef = useRef(null);
    useEffect(() => {
        if (!vantaEffect) {
            setVantaEffect(NET({
                el: myRef.current,
                THREE: THREE,
                maxDistance: 22.00,
                points: 20.00,
            }))
        }
        return () => {
            if (vantaEffect) vantaEffect.destroy()
        }
    }, [vantaEffect]);

    const getWeather = (citiName) => {
        if (citiName === "Ош" || citiName === "ош") {
            citiName = 'osh'
        }

        axios(`https://api.openweathermap.org/data/2.5/weather?q=${citiName}&appid=${KEY}&lang=ru&units=metric`)
            .then(({ data }) => setWeather(data));
        setName('')

    }


    const enter = (e) => {
        if (e.key === 'Enter') {
            getWeather(name)
        }
    }


    return (
        <>

            <div className="vanta" ref={myRef}></div>
            <div className='content'>
                <div className="App">
                    <div className="container">
                        <div className="inputs">
                            <input value={name} onKeyDown={(e) => enter(e)} onChange={(e) => setName(e.target.value)} className='input' type="text" />
                            <button onClick={() => getWeather(name)} className='btn'>узнать</button>
                        </div>

                        {weather.length === 0 ? 'введите называние города' :
                            <div className="menu">
                                <div className='allCards'>

                                    <div className='card'>
                                        <div className='alymbek'>
                                        <img className='icon' src={icon} alt="" />
                                        <p className='title'>Город</p>
                                            </div>
                                            <div className="usekov">
                                            <p>{weather.name}</p>
                                                </div>                                                  
                                    
                                    </div>

                                    <div className='card'>
                                        <div className='alymbek'>
                                        <img className='earth' src={earth} alt="" />
                                        <p className='title'>Страна</p>
                                        </div>  
                                        <div className="usekov">
                                        <p>{weather.sys.country}</p>
                                            </div>  
                                       
                                    </div>

                                </div>


                                <div className='allCards kart'>

                                    <div className='card'>
                                        <div className='alymbek'>
                                        <img className='speed' src={speed} alt="" />
                                        <p className='title'>Скорость</p>
                                        </div> 
                                        <div className="usekov">
                                        <p>{weather.wind.speed}м/с</p>
                                            </div>                                  
                                    
                                    </div>
                                
                                    <div className='card'>
                                        <div className='alymbek'>
                                        <img className='cloud' src={cloud} alt="" />
                                        <p className='title'>Небо</p>
                                        </div>  
                                        <div className="usekov">
                                        <p>{weather.weather[0].description}</p>
                                            </div>                                    
                                      
                                    </div>

                                </div>

                                <div className='kartina'>

                                    <div className='items'>
                                        <p className='temp'>{(weather.main.temp).toFixed(0,2)}°C</p>
                                        <div className='tp'>
                                            <img className='temper' src={temper} alt="" />
                                            <p className='subtitle'>температура</p>
                                        </div>
                                    </div>

                                    <img className='foto' src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`} alt="" />
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </div>

        </>

    )

}

export default App;

