import { React, useState } from 'react'
import Header from '../../components/header'
import Sidebar from '../../components/sidebar/index'
import Content from '../../components/content/index'
import './Home.scss'

function Home() {
	const [type, setType] = useState();
	const [search, setSearch] = useState();
	return (
		<div>
			<Header setSearch={setSearch} search={search}/>
			<div className='container'>
				<Sidebar setType={setType} />
				<Content type={type} search={search}/>
			</div>
		</div>
	)
}

export default Home

