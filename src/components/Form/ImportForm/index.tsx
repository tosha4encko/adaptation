import * as React from 'react'
import axios from 'axios'
import {isValid} from '../valid'

interface State{
	profile:{
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
	};
	isEdit: boolean;
}

export interface Props{
	id?: number;
	defaultState?:{
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
	title?: string;
}

export class ImportForm extends React.Component<Props, State>{
	state:State;
	constructor(props){
		super(props);
		this.state = {profile: this.props.defaultState, isEdit: true};

		this.onInputChange = this.onInputChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	static defaultProps = {
    defaultState:{
			first_name: '',
			last_name: '',
			city_code: '',
			phone: '',
			mail: '',
			image_url: '',
			post:  '',
			subdivisions: '',
			latitude: 39.72,
			longitude: 47.23
		},
		title: 'Add new profile'
  };

	onSubmit(event){
		if (isValid(this.state.profile)){
			this.props.id === undefined
			? axios.post('api/v0/TB/', this.state.profile).then()
			: axios.put(`api/v0/TB/${this.props.id}`, this.state.profile).then();
			location.reload(true);
		}
	}

	onInputChange(event){
		const name = event.target.name;
		this.state.profile[name] = event.target.value;
		this.forceUpdate();
	}

	render() {
		let {
			first_name,
			last_name,
			city_code,
			phone,
			mail,
			image_url,
			post,
			subdivisions,
			latitude,
			longitude
		} = this.state.profile;

		let isEdit = this.state.isEdit;
		return(
			<div>
				<h4> {this.props.title} </h4>
				<form className="bform" action='#'>
					<div className="item">
						<label> First Name </label>
						<input
							name="first_name" 
							autoComplete="off"
							type="text" 
							onChange={this.onInputChange}
							value={first_name}
						/>
					</div>	
					<div className="item">
						<label> Last Name </label>
						<input
							name="last_name" 
							autoComplete="off"
							type="text" 
							onChange={this.onInputChange}
							value={last_name}
						/>
					</div>	
					<div className="item">
						<label> City Code </label>
						<input
							name="city_code" 
							autoComplete="off"
							type="text" 
							onChange={this.onInputChange}
							value={city_code}
						/>
					</div>	
					<div className="item">
						<label> Phone </label>
						<input
							name="phone" 
							autoComplete="off"
							type="text" 
							onChange={this.onInputChange}
							value={phone}
						/>
					</div>

					<div className="item">
						<label> Mail </label>
						<input
							name="mail" 
							autoComplete="off"
							type="text" 
							onChange={this.onInputChange}
							value={mail}
						/>
					</div>	
					<div className="item">
						<label> Image </label>
						<input
							name="image_url" 
							autoComplete="off"
							type="text" 
							onChange={this.onInputChange}
							value={image_url}
						/>
					</div>	
					<div className="item">
						<label> Post </label>
						<input
							name="post" 
							autoComplete="off"
							type="text" 
							onChange={this.onInputChange}
							value={post}
						/>
					</div>
					<div className="item">
						<label> Subdivisions </label>
						<input
							name="subdivisions" 
							autoComplete="off"
							type="text" 
							onChange={this.onInputChange}
							value={subdivisions}
						/>
					</div>	
					<div className="item">
						<label> Latitude </label>
						<input
							name="latitude" 
							autoComplete="off"
							type="text" 
							onChange={this.onInputChange}
							value={latitude}
						/>
					</div>
					<div className="item">
						<label> Longitude </label>
						<input
							name="longitude" 
							autoComplete="off"
							type="text" 
							onChange={this.onInputChange}
							value={longitude}
						/>
					</div>	
					<input type="button" onClick={this.onSubmit} value="Submit" />
				</form>
			</div>
		);
	}
}