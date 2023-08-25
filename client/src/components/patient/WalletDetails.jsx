import React from 'react';
import { useEffect, useState } from 'react';
import instance from '../../instance/instance';
import { getWalletBalance } from '../../API/user';

const   WalletDetails = () => {

    const token = JSON.parse(localStorage.getItem("clientToken"));
    const [balance,setBalance] = useState()


    useEffect(() => {
        walletBalance()
    }, []);

    const walletBalance = async() =>{
        const response = await getWalletBalance()
        setBalance(response.data.walletBalance)
    }


    return (
        <div>
        <div className="flex items-center justify-center leading-tight p-2 md:p-4  w-100">
                <img
                    src="https://icons.iconarchive.com/icons/flat-icons.com/flat/512/Wallet-icon.png"
                    className="h-72 "
                    alt="" />
            </div>
                <div className="flex items-center justify-center leading-tight p-2 md:p-4  w-100">
                    <p class="not-italic font-medium text-4xl text-cyan-700">
                        Wallet
                    </p>
                </div>

                <div className="flex items-center justify-center leading-tight p-2 md:p-4  w-100">
                    <p class="not-italic font-medium text-2xl text-cyan-700">
                        Available Balance : ₹{balance}
                    </p>
                </div>
         </div>
    );
}

export default WalletDetails;
