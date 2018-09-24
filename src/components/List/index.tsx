import * as React from 'react'
import * as ReactDOM from 'react-dom'
import {ListItem} from '../ListItem'
import {ListProjItem} from '../ListProjItem'

export interface List {void}
export interface Props {
	listType: string;

	profile?: {
    properties: {
      first_name: string;
      last_name: string;
      city_code: string;
      phone: string;
      mail: string;
      post: string;
      subdivisions: string;
      image: string;
    }
  }[];
	sortableField?: string;
	openModalCard?: any;

	projects?: {
		name: string;
		repos: string;
		develop: number[];
	}[]
	visionDevelopers?: any;
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
		let profiles;
		if (this.props.listType === 'profiles'){
			profiles = this.props.profile.slice();
			profiles.sort(this.sortFunc);
		}
		return(
			<div>
			    {this.props.listType === 'profiles' && 
				    profiles.map((profile, index) => (
						<div key={index}>
							<ListItem profile={profile} openModalCard={this.props.openModalCard}/>
						</div>
					))}
				  {this.props.listType === 'projects' && 
				    this.props.projects.map((project, index) => (
						<div key={index}>
							<ListProjItem projects={project}  visionDevelopers={this.props.visionDevelopers}/>
						</div>
					))}
			</div>
		);
	}
}
