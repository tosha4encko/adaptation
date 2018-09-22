import * as React from 'react'
import * as ReactDOM from 'react-dom'

import {Modal} from '../Modal'
import {ObjectCard} from '../ObjectCard'

import olMap from 'ol/Map.js';

import './listItem.scss'

export interface Props {
	profile : {
		first_name: string;
		last_name:  string;
		city_code:  string;
		phone:  string;
		mail: string;
		image_url:  string;
		post:  string;
		subdivisions:  string;
		latitude: number;
    longitude: number;
	},
	addFeatures?: any;
}  

interface State{
	isModalOpen:boolean;
}
export class ListItem extends React.Component<Props, State>{
	state:State = {isModalOpen:false};

	componentDidMount(){
		let {
			latitude,
			longitude,
			image_url
		} = this.props.profile;
		if (latitude !== null && longitude !== null)
			this.props.addFeatures(latitude, longitude, image_url);
	}

	render(){
		let {
		first_name,
		last_name,
		city_code,
		phone,
		mail,
		image_url,
		post,
		subdivisions,
		} = this.props.profile;
		return (
			<div>
				<div className="list-item" onClick={()=>this.setState({ isModalOpen: true })}>
					<div> <img src={image_url} width="87" height="100" /> </div>
					<div className='contacts'>
						<p className='name'> <b>{`${first_name} ${last_name}`}</b> </p>
						<p> {`(${city_code}) ${phone}`}</p>
						<p> {subdivisions} </p>
						<p> {mail} </p>
						<p> {post} </p>
					</div>
				</div>
				<Modal 
					isOpen={this.state.isModalOpen}
					onClose={() => this.setState({ isModalOpen: false })}
				>
					<ObjectCard
						profile={this.props.profile}
					/>
				</Modal>
			</div>
		)
	};
}