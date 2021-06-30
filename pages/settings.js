import { useState, useEffect } from 'react';

import { ethers } from 'ethers';

import { WATERING_HOLES_ADDRESS } from '../constrants/index';
import { WATERING_HOLES_ABI } from '../constrants/abi';

const Settings = () => {
    const [WateringHoles, setWateringHoles] = useState({});

    useEffect(() => {
        setWateringHoles(new ethers.Contract( WATERING_HOLES_ADDRESS , WATERING_HOLES_ABI , (new ethers.providers.Web3Provider(window.ethereum)).getSigner()));
    }, []);

    const [name, setName] = useState('');
    const [favoriteTopic, setFavoriteTopic] = useState('');
    const [profilePhotoURL, setProfilePhotoURL] = useState('');

    const [changeNameVisible, setChangeNameVisible] = useState(false);
    const [changePhotoVisible, setChangePhotoVisible] = useState(false);
    const [changeTopicVisible, setChangeTopicVisible] = useState(false);

    const processChanges = async () => {
        if(changeNameVisible) {
            await WateringHoles.updateName(name);
        }
        if(changePhotoVisible) {
            await WateringHoles.updateProfilePhoto(profilePhotoURL);
        }
        if(changeTopicVisible) {
            await WateringHoles.updateFavoriteTopic(favoriteTopic);
        }

        setChangeNameVisible(false);
        setChangeTopicVisible(false);
        setChangePhotoVisible(false);
    }

    return (
        <div className='flex-col flex items-center py-24'>
            <div className='flex flex-col bg-blue-600 border-4 border-yellow-400 items-center mt-16' >
                <form className='px-24 py-12 flex flex-col items-center'>
                    <div className='flex items-center'>
                        <p className='font-holocene text-yellow-400 text-2xl pb-4 '>Settings</p>
                    </div>

                    <div className='pb-4'>
                        <div>
                            <label for='Change Name' className='font-holocene text-yellow-400'>Change your name?  </label>
                            <input type='checkbox' checked={changeNameVisible} className='-mb-0.5' onChange={() => setChangeNameVisible(!changeNameVisible)}/>
                        </div>
                        <input id='Change Name' className={`font-holocene bg-blue-400 border-yellow-400 border-b-2 ${changeNameVisible? "visible": "hidden"}`} onChange={(e) => {setName(e.target.value);}}/>
                    </div>

                    <div className='pb-4'>
                        <div>
                            <label for='Change Photo' className='font-holocene text-yellow-400'>Change your photo?  </label>
                            <input type='checkbox' checked={changePhotoVisible} className='-mb-0.5' onChange={() => setChangePhotoVisible(!changePhotoVisible)}/>
                        </div>
                        <input id='Change Photo' className={`font-holocene bg-blue-400 border-yellow-400 border-b-2 ${changePhotoVisible? "visible": "hidden"}`} onChange={(e) => {setProfilePhotoURL(e.target.value);}}/>
                    </div>

                    <div className='pb-4 flex flex-col items-center'>
                        <div>
                            <label for='Change Favorite Topic' className='font-holocene text-yellow-400'>Change your favorite topic?  </label>
                            <input type='checkbox' checked={changeTopicVisible} className='-mb-0.5' onChange={() => setChangeTopicVisible(!changeTopicVisible)}/>
                        </div>
                        <select id='Change Favorite Topic' className={`my-2 font-holocene bg-blue-600 placeholder-yellow-400 border-b-2 border-yellow-400 text-yellow-400 outline-none ${changeTopicVisible? "visible": "hidden"}`} onChange={(e) => {setFavoriteTopic(e.target.value);}}>
                            <option value='Science'>Science</option>
                            <option value='Technology'>Technology</option>
                            <option value='Culture'>Culture</option>
                            <option value='Music'>Music</option>
                            <option value='Film'>Film</option>
                            <option value='Television'>Television</option>
                            <option value='Art'>Art</option>
                            <option value='Books'>Books</option>
                        </select>
                    </div>

                    <button type='reset' className='bg-blue-400 border-2 border-yellow-400 text-yellow-400 rounded px-4 py-2' onClick={() => {
                        processChanges();
                    }}>
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Settings;