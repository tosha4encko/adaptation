import * as React from 'react'
import * as ReactDOM from 'react-dom'
import axios from 'axios'

import {ImportForm} from '../Form'
import {Modal} from '../Modal'

import './ObjCard.scss'


interface Profile {
	first_name: string;
	last_name: string;
	city_code: string;
	phone: string;
	mail: string;
	post: string;
	subdivisions: string;
	image: string;
	id: number;
}

export interface Props {
	features: {
    geometry: {coordinates: [number, number]},
    properties: Profile
  };
}  

export interface State{
	isModalOpen: boolean;
}

export class ObjectCard extends React.Component<Props, State> {
	state:State = {isModalOpen: false};
	deleteProfile = () => {
		axios.delete(`api/v0/TB/${this.props.features.properties.id}`).then();
		location.reload(true);
	}
	render(){
		let {
			first_name,
			last_name,
			city_code,
			phone,
			mail,
			post,
			subdivisions,
			image,
			id
		} = this.props.features.properties;
		return (
			<div className="obj-card"> 
				<div className="image">
					<img src={image} />
				</div>
				<div className="inform">
					<div className="title">
						<div> <b> First name </b> : </div>
						<div> <b> Last name </b> : </div>
						<div> <b> Phone </b> : </div>
						<div> <b> Mail </b> : </div>
						<div> <b> Post </b> : </div>
						<div> <b> Subdivisions </b> : </div>
					</div>
					<div className="data">
						<div> {first_name}</div>
						<div> {last_name} </div>
						<div> {`(${city_code}) ${phone}`}</div>	
						<div> {mail} </div>
						<div> {post} </div>
						<div> {subdivisions} </div>
					</div>
					<div className="button">
						<button onClick={() => this.setState({ isModalOpen: true })}> Edit </button>
						<Modal 
							isOpen={this.state.isModalOpen}
							onClose={() => this.setState({ isModalOpen: false })}
						>
							<ImportForm 
								id={id}
								title="Update this profile"
								defaultProfile={
									{ 
										first_name: first_name,
										last_name: last_name,
										city_code: city_code,
										phone: phone,
										mail: mail,
										post: post,
										subdivisions: subdivisions,
								  }
								}
							/>
						</Modal>
						<button onClick={this.deleteProfile}> Delete </button>
					</div>
				</div>
			</div>
		)
	}
}