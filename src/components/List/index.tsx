import * as React from 'react'
import * as ReactDOM from 'react-dom'
import {ListItem} from '../ListItem'

export interface List {void}
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
	}[],
	sortableField?: string;
	addFeatures?: any;
}
export class List extends React.Component<Props> {
	constructor(Props){
		super(Props);
		this.sortFunc = this.sortFunc.bind(this);
	}

	static defaultProps = {
    sortableField: 'id'
  };

	sortFunc(x, y) {
		let sortableField = this.props.sortableField;
	  if (x[sortableField] > y[sortableField]) return 1;
	  if (x[sortableField] < y[sortableField]) return -1;
	}

	render(){
		let profiles = this.props.profile.slice();
		profiles.sort(this.sortFunc);
		return(
			<div>
			    {profiles.map((profile, index) => (
					<div key={index}>
						<ListItem profile={profile} addFeatures={this.props.addFeatures}/>
					</div>
				))}
			</div>
		);
	}
}
