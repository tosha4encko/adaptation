import * as React from 'react'
import axios from 'axios'
import {isValid} from '../valid'

interface Profile {
	first_name: string;
	last_name: string;
	city_code: string;
	phone: string;
	mail: string;
	post: string;
	subdivisions: string;
}

interface State{
	features: {
    geometry:{coordinates: number[]}
    properties: Profile
  };
	isEdit: boolean;
}

export interface Props{
	id?: number;
	defaultProfile : Profile;
	title?: string;
}

export class ImportForm extends React.Component<Props, State>{
	state:State;
	constructor(props){
		super(props);
		let initFeature = {
	    geometry:{coordinates: this.props.defaultLocations},
	    properties: this.props.defaultProfile
	  };
		this.state = {features: initFeature, isEdit: true};

		this.onInputChange = this.onInputChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	static defaultProps = {
    defaultProfile:{
			first_name: '',
			last_name: '',
			city_code: '',
			phone: '',
			mail: '',
			post: '',
			subdivisions: ''
		},
		defaultLocations: [39.72, 47.23],
		title: 'Add new profile'
  };

	onSubmit(event){
		if (isValid(this.state.features.properties)){
			let features = this.state.features.properties ;
			this.props.id === undefined
			? axios.post('api/v0/TB/', features).then()
			: axios.put(`api/v0/TB/${this.props.id}`, features).then();
			location.reload(true);
		}
	}

	onInputChange(event){
		const name = event.target.name;
		if (name === 'latitude')
			this.state.features.geometry.coordinates[0] = event.target.value;
		else
		if (name === "longitude")
				this.state.features.geometry.coordinates[1] = event.target.value;
		else
			this.state.features.properties[name] = event.target.value;
		this.forceUpdate();
	}

	render() {
		let {
			first_name,
			last_name,
			city_code,
			phone,
			mail,
			post,
			subdivisions
		} = this.state.features.properties;

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
					<input type="button" onClick={this.onSubmit} value="Submit" />
				</form>
			</div>
		);
	}
}