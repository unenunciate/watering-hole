import { useState, useEffect } from 'react';
import { useEthers } from '../contracts/hooks/use-ethers';

import { ethers } from 'ethers';
import {EtherProvider, useEtherProvider, useAccount} from 'use-ether-provider';

import { GALLONS_ERC20_ADDRESS } from '../../../constrants/index';
import { GALLONS_ERC20_ABI } from '../../../constrants/abi';

import { WATERING_HOLES_BOND_ADDRESS } from '../../../constrants/index';
import { WATERING_HOLES_BOND_ABI } from '../../../constrants/abi';

import { WATERING_HOLES_ADDRESS } from '../../../constrants/index';
import { WATERING_HOLES_ABI } from '../../../constrants/abi';

import Link from 'next/link';

const Settings = ({ user }) => {

    Technology Culture Science Music Film Television Art Books
    const WateringHoles = new ethers.Contract( WATERING_HOLES_ADDRESS , WATERING_HOLES_ABI , Ethers.getSigner('0x7289Be8F6E14AF0385e1Ce5DB9fcb0d096514F7A'));
    const WateringHolesBond = new ethers.Contract( WATERING_HOLES_BOND_ADDRESS , WATERING_HOLES_BOND_ABI , Ethers.getSigner('0x7289Be8F6E14AF0385e1Ce5DB9fcb0d096514F7A'));
    const GallonsERC20 = new ethers.Contract( GALLONS_ERC20_ADDRESS , GALLONS_ERC20_ABI , Ethers.getSigner('0x7289Be8F6E14AF0385e1Ce5DB9fcb0d096514F7A'));

    const [name, setName] = useState('');
    const [favoriteTopic, setFavoriteTopic] = useState('');
    const [profilePhotoURL, setProfilePhotoURL] = useState('');

    

    return (
        name
    );
}

export async function getServerSideProps(context) {
    const { Ethers } = useEthersProvider();

    const WateringHoles = new ethers.Contract( WATERING_HOLES_ADDRESS , WATERING_HOLES_ABI , Ethers );
    
    const { hole, slug } = query;
    
    const user = await WateringHoles.getUser(post._poster);

    const numberOfCommentsInPost = parseInt(post._numberOfCommentsInPost); 
    let comments = [];

    for(let i = 1; i <= numberOfCommentsInPost; i++ ) {
        const commentPost = await WateringHoles.getComment(parseInt(hole, 10), i);
        const commentUser = await WateringHoles.getUser(commentPost._poster);
        comments.push({ post: commentPost, user: commentUser });
    }
    return {
      props: {}, // will be passed to the page component as props
    }
}

export default Settings;