import React, { useState } from 'react';

import Palying from './index_nav_palying.js'
import Palylist from './index_nav_playlist.js'
import Search from './index_nav_search.js'

import Scss from './index.module.scss'

const listType = {
    playing: 'Playing',
    playList: 'PlayList',
    search: "Search"
}

export default function Nav() {

    const [zujian, setZujian] = useState(listType.palying);
    const [search, setSearch] = useState(false);

    return (
        <div className={Scss.nav}>
            <div className={Scss.button}>
                <span onClick={() => setZujian(listType.palying)}>正在播放</span>
                <span onClick={() => setZujian(listType.playList)}>播放列表</span>
                <span onClick={() => setSearch(!search)}>歌曲搜索</span>
            </div>
            {zujian === listType.palying && (<Palying />)}
            {zujian === listType.playList && (<Palylist onClick={() => setZujian(listType.palying)}/>)}
            {search ? <Search value={[search, setSearch]}/> : null}
        </div>
    );
}