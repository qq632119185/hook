import React, { useEffect, useContext } from 'react';

import Scss from './index.module.scss'

import { countContext } from './index.js'

export default function Palylist(props) {

    const [palylist, setPalylist, , , , ] = useContext(countContext)

    useEffect(() => {
        fetch('./playlist.json')
            .then(res => res.json())
            .then(
                result => {
                    setPalylist(result.data)
                },
                (error) => {
                    console.log(error)
                }
            )
    }, [setPalylist])

    function handleOnclickshare(itemx) {
        let palylistx = palylist.map(item => {
            item.id === itemx.id ? item.completed = true : item.completed = false
            return item
        })
        setPalylist(palylistx)
        props.onClick()
    }

    return (
        <div className={Scss.playlist}>
            {palylist.map(item => <div key={item.id}>
                <p>
                    <img onClick={() => handleOnclickshare(item)} src={item.listimg} alt='img'></img>
                </p>
                <span>{item.listname}</span>
            </div>)}
        </div>
    )
}