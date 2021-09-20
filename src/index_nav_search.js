import React from 'react';

import Scss from './index.module.scss'

export default function Search(props) {
    const [search, setSearch] = props.value
    return (
        <div className={Scss.search}>
            <div className={Scss.searchx}>
                <span className={Scss.searchclick} onClick={() => setSearch(!search)}></span>
                <p>
                    <input type='text' autoFocus></input>
                    <span>搜索</span>
                </p>
                <div>
                    <input type='radio' defaultChecked></input> 网易云
                    <input type='radio'></input> QQ
                    <input type='radio'></input> 虾米
                    <input type='radio'></input> 酷狗
                    <input type='radio'></input> 百度
                </div>
            </div>
        </div>
    )
}