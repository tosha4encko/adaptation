import * as React from 'react'
import * as ReactDOM from 'react-dom'
import {List, SearchForm, ImportForm, Modal, ObjectCard} from '../components/'

import olMap from 'ol/Map.js';
import View from 'ol/View.js';
import {defaults as defaultControls, ScaleLine} from 'ol/control.js';
import TileLayer from 'ol/layer/Tile.js';
import TileWMS from 'ol/source/TileWMS.js';
import OSM from 'ol/source/OSM'
import Feature from 'ol/Feature'
import Point from 'ol/geom/Point'
import {fromLonLat} from 'ol/proj.js'
import Icon from 'ol/style/Icon'
import Image from 'ol/style/Image'
import Style from 'ol/style/Style'
import VectorSource from 'ol/source/Vector.js';
import {Vector as VectorLayer} from 'ol/layer.js';
import olCollections from 'ol/Collection';
import GeoJSON from 'ol/format/GeoJSON.js';

import axios from 'axios'

interface Profile {
	first_name: string;
	last_name: string;
	city_code: string;
	phone: string;
	mail: string;
	post: string;
	subdivisions: string;
	image: string;
}

interface Proj {
	name: string;
	repos: string;
	develop: string[];
}

export interface State {
	features: {
    geometry:{coordinates: [number, number]},
    properties: Profile
  }[];
  foundedFeatures: {
    geometry:{coordinates: [number, number]},
    properties: Profile
  }[];

  projects: Proj[];
  foundedProj: Proj[];
  
  activeProfile: {
    geometry:{coordinates: [number, number]},
    properties: Profile
  };

	isInpModalOpen:boolean;
	isCardModalOpen:boolean;
	sortableField?: string;

	map?: olMap;
	vectorSource: VectorSource;

	stateList: string;
}

export interface Props {}
export class LayOut extends React.Component<Props, State> {
	constructor(Props){
		super(Props)

		this.onInputChange = this.onInputChange.bind(this);
		this.openModalCard = this.openModalCard.bind(this);
		this.increaseDevelopersForId = this.increaseDevelopersForId.bind(this);
		this.decreaseAllDeveloper = this.decreaseAllDeveloper.bind(this);
	}

	state:State = {
		vectorSource: undefined,
		features: undefined,
		isInpModalOpen:false,
		isCardModalOpen:false,
		stateList: 'profiles'
	};

	setResults = (datas) => {
		if (this.state.stateList === 'profiles')
			this.setState({foundedFeatures: datas});
		if (this.state.stateList === 'projects')
			this.setState({foundedProj: datas});
	}
	
	onInputChange(event){
		this.state.sortableField = event.target.value;
		this.forceUpdate();
	}

	openModalCard(id: number){
		let features = this.state.features;
		for (let i = 0; i < features.length; i++){
			if (features[i].properties.id === id) {
				this.setState({activeProfile: features[i]});
				this.setState({isCardModalOpen: true});
				break;
			}
		}
	}

	increaseDevelopersForId(id: number[]){
		//this.decreaseAllDeveloper();
		let features = this.state.vectorSource.getFeatures();
		features.forEach(feature => {
			let pred = id.indexOf(feature.get('id'));
			if (pred !== -1)
				this.increaseIcon(feature);
			else
				this.decreaseIcon(feature);
		});
	}

	decreaseAllDeveloper(){
		let features = this.state.vectorSource.getFeatures();
		features.forEach(feature => {this.decreaseIcon(feature);});
	}

	increaseIcon(feature){
		let image = new Icon(({
      src: feature.get('image'),
      scale: 0.8,
    }))
		let style = feature.getStyle();
		style.setImage(image);
		style.setZIndex(999);
		feature.setStyle(style);
	} 

	decreaseIcon(feature){
		let image = new Icon(({
      src: feature.get('image'),
      scale: 0.4,
    }))
		let style = feature.getStyle();
		style.setImage(image);
		style.setZIndex(0);
		feature.setStyle(style);
	}

	componentDidMount() {
		axios.get('api/v0/Proj').then( res => {
			this.state.projects = res.data;
			this.state.foundedProj = res.data;
			this.forceUpdate();
		});
		axios.get('/api/v0/TB/').then(res => {
			var vectorSource = new VectorSource({
				features: new GeoJSON().readFeatures({
					type: 'FeatureCollection',
					features: res.data.features
				})
			});

			this.state.vectorSource = vectorSource;
	    let features = vectorSource.getFeatures();
	    features.forEach(feature =>{
	    	let img = feature.get('image');
	    	if (img) {
	    		let iconStyle = new Style({
		        image: new Icon(({
		          src: feature.get('image'),
		          scale: 0.4,
		        }))
	     		});
	    		feature.setStyle(iconStyle);
	    	}
	    });

	    var vectorLayer = new VectorLayer({
	      source: vectorSource
	    });

	    var layers = [
	      new TileLayer({
	        source: new OSM()
	      }),
	      vectorLayer
	    ];

		  this.state.map = new olMap({
		    layers: layers,
		    target: 'map',
		    view: new View({
		      projection: 'EPSG:4326',
		      center: [39.72, 47.23],
		      zoom: 12
		    })
		  });

		  this.state.map.on('singleclick', (e) => {
		  	this.state.map.forEachFeatureAtPixel(e.pixel, feature => {
          this.openModalCard(feature.get('id'));
        });
		  })

		  this.state.features = res.data.features;
		  this.state.foundedFeatures = res.data.features;
		  this.forceUpdate();
		})
	}

	openListProf = () => {
		this.decreaseAllDeveloper();
		this.setState({stateList: 'profiles', foundedFeatures: this.state.features})		
	}

	openListProg = () => {
		this.decreaseAllDeveloper();
	  this.setState({stateList: 'projects', foundedProj: this.state.projects})
	}

	render(){
		return(
			<div className="content">
				<div className="left-content">
					<div className="head-title">
						<p> <b> Телефонный справочник </b> </p>
					</div>
					<div className="button-diff-list">
						<button  onClick={this.openListProf}>
							List profiles
						</button>
						<button  onClick={this.openListProg}>
							List projects
						</button>
					</div>

					<div className="search-form">
						{ this.state.stateList === 'profiles' && 
							<SearchForm
								features={this.state.features}
								setResults={this.setResults}
							/>
						}
						{ this.state.stateList === 'projects' && 
							<SearchForm
								features={this.state.projects}
								setResults={this.setResults}
							/>
						}
					</div>

					{ this.state.stateList === 'profiles' && 
						<select onChange={this.onInputChange} className="select-form">
						  <option value="id">id</option>
	  					<option value="first_name">First name</option>
	  					<option value="last_name">Last name</option>
	  					<option value="city_code">City code</option>
	  					<option value="phone">Phone</option>
	  					<option value="post">Post</option>
	  					<option value="subdivisions">Subdivisions</option>
	  					<option value="mail">Mail</option>
						</select>
  				}
  				{ this.state.stateList === 'projects' && 
						<select onChange={this.onInputChange} className="select-form">
						  <option value="id">id</option>
	  					<option value="name">Project</option>
	  					<option value="repos">Repository</option>
						</select>
  				}

					<div className="list">
					{
						this.state.foundedFeatures !== undefined &&
						this.state.stateList === 'profiles' && 
						<List 
							listType="profiles"
							profile={this.state.foundedFeatures}
							sortableField={this.state.sortableField}
							openModalCard={this.openModalCard}
						/>
					}
					{
						this.state.projects !== undefined &&
						this.state.stateList === 'projects' && 
						<List 
							listType="projects"
							projects={this.state.foundedProj}
							sortableField={this.state.sortableField}
							visionDevelopers={this.increaseDevelopersForId}
						/>
					}
					</div>
					<div className="form import-form">
						<button  
							className="open-modal"
							onClick={() => this.setState({ isInpModalOpen: true })}
						> 
							Add new profile 
						</button>
						<Modal 
							isOpen={this.state.isInpModalOpen}
							onClose={() => this.setState({ isInpModalOpen: false })}
						>
							<ImportForm/>
						</Modal>
						<Modal 
							isOpen={this.state.isCardModalOpen}
							onClose={() => this.setState({ isCardModalOpen: false })}
						>
						{
							this.state.activeProfile !== undefined &&
							<ObjectCard
								features={this.state.activeProfile}
							/>
						}
						</Modal>
					</div>
					<div className="form">
						<button 
							className="synch"
							onClick={() => {axios.get('/synch/').then(res => location.reload())}}
						> 
							Synch 
						</button>
					</div>
				</div>
				<div className="right-content">
					<div className="map" id="map"></div>
				</div>
			</div>
		);
	}
}
				