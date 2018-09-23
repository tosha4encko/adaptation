import * as React from 'react'
import * as ReactDOM from 'react-dom'

import {Modal} from '../Modal'

import olMap from 'ol/Map.js';

import './listItem.scss'

export interface Props {
	profile : {
    properties: {
    	id: number;
      first_name: string;
      last_name: string;
      city_code: string;
      phone: string;
      mail: string;
      post: string;
      subdivisions: string;
      image: string;
    }
  },
	openModalCard?: any;
}  

interface State{
	isModalOpen:boolean;
}
export class ListItem extends React.Component<Props, State>{
	render(){
		let {
		id,
		first_name,
		last_name,
		city_code,
		phone,
		mail,
		image,
		post,
		subdivisions,
		} = this.props.profile.properties;
		return (
			<div>
				<div className="list-item" onClick={()=>this.props.openModalCard(id)}>
					<div> <img src={image} width="87" height="100" /> </div>
					<div className='contacts'>
						<p className='name'> <b>{`${first_name} ${last_name}`}</b> </p>
						<p> {`(${city_code}) ${phone}`}</p>
						<p> {subdivisions} </p>
						<p> {mail} </p>
						<p> {post} </p>
					</div>
				</div>
			</div>
		)
	};
}