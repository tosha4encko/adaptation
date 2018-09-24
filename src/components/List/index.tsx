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

export interface State{
	activeItemId: number|undefined;
}

export class List extends React.Component<Props, State> {
	constructor(Props){
		super(Props);
		this.sortFunc = this.sortFunc.bind(this);
	}

	state:State = {
		activeItemId: undefined
	};

	static defaultProps = {
    sortableField: 'id'
  };

	sortFunc(x, y) {
		let sortableField = this.props.sortableField;
	  if (x[sortableField] > y[sortableField]) return 1;
	  if (x[sortableField] < y[sortableField]) return -1;
	}

	acriveItem(id){
		this.setState({activeItemId: id});
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
					<div key={index} 
						  onClick={() => this.acriveItem(index)}>
						<ListProjItem 
							projects={project}  
							visionDevelopers={this.props.visionDevelopers} 
							isActive={this.state.activeItemId === index ? true : false}
						/>
					</div>
				))}
			</div>
		);
	}
}
