import * as React from 'react'
import axios from 'axios'

export interface Props {
	profile : {
		first_name: string;
		last_name:  string;
		city_code:  string;
		phone:  string;
		mail: string;
		post:  string;
		subdivisions:  string;
	}[];
	setResults(any):void;
}

export class SearchForm extends React.Component<Props>{
	constructor(Props){
		super(Props);
		this.onInputChange = this.onInputChange.bind(this);
	}

	searchSubStr(subStr: string){
		let res = [];
		this.props.profile.forEach(data => {
			for (let key in data)
				if (key !== 'id' && 
						key !== 'latitude' && 
						key !== 'longitude' && 
					  data[key] !== undefined && 
					  data[key].toLowerCase().indexOf(subStr) !== -1){
					res.push(data);
					break;
				}
		});
		return res;
	}

	onInputChange(event){
		let subStr = event.target.value;
		this.props.setResults(this.searchSubStr(subStr));
	}	


	render() {
		return(
			<div>
				<input 
					name="data" 
					autoComplete="off"
					type="text" 
					onChange={this.onInputChange}/>
			</div>
		);
	}
}