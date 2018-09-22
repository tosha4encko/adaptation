import * as React from 'react'
import * as ReactDOM from 'react-dom'
import {List, SearchForm, ImportForm, Map, Modal} from '../components/'

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

export interface State {
	allTypes : {
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
	}[];
	foundTypes :{
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
	}[];
	isModalOpen:boolean;
	sortableField?: string;
	map?: olMap;
}

export interface Props {}
export class LayOut extends React.Component<Props, State> {
	constructor(Props){
		super(Props)

		this.onInputChange = this.onInputChange.bind(this);
		this.addFeatures = this.addFeatures.bind(this);
	}

	state:State = {
		allTypes:undefined, 
		foundTypes: undefined, 
		isModalOpen:false
	};

	async loadProfile () {
		this.setState({
			allTypes: await fetch("/api/v0/TB/").then(
				response =>response.json())
		});
		this.setState({foundTypes: this.state.allTypes})
	}

	setResults = (datas) => {
		this.setState({foundTypes: datas});
	}
	
	onInputChange(event){
		this.state.sortableField = event.target.value;
		this.forceUpdate();
	}

	componentDidMount() {
		this.loadProfile();
		var vectorSource = new VectorSource()
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
	}

	addFeatures(latitude:number, longitude:number, image_url:string){
		let map = this.state.map;

		let layerGroup = map.getLayerGroup();
		let layersArray = layerGroup.getLayers().getArray();
		let vectorLayer = layersArray[1]
		if (!(vectorLayer instanceof VectorLayer)){
			throw new ReferenceError('bad layer') 
		}

		let vectorSource = vectorLayer.getSource();

		let iconFeature = new Feature({
			geometry: new Point([latitude, longitude]),
		});

		iconFeature.setStyle(
			new Style({
	      image: new Icon(({
					anchor: [0.5, 0.96],
					crossOrigin: 'anonymous',
	        src: 'https://openlayers.org/en/v4.1.0/examples/data/dot.png'
	      }))
    	})
		);

		vectorSource.addFeature(iconFeature);
		vectorLayer.setSource(vectorSource);
		let layerCollections = new olCollections(layersArray);
		layerGroup.setLayers(layerCollections);

		map.setLayerGroup(layerGroup);
	}

	render(){
		return(
			<div className="content">
				<div className="left-content">
					<div className="head-title">
						<p> <b> Телефонный справочник </b> </p>
					</div>
					<div className="search-form">
						<SearchForm
							profile={this.state.allTypes}
							setResults={this.setResults}
						/>
					</div>
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
					<div className="list">
					{
						this.state.foundTypes !== undefined &&
						<List 
							profile={this.state.foundTypes}
							sortableField={this.state.sortableField}
							addFeatures={this.addFeatures}
						/>
					}
					</div>
					<div className="form import-form">
						<button  
							className="open-modal"
							onClick={() => this.setState({ isModalOpen: true })}
						> 
							Add new profile 
						</button>
						<Modal 
							isOpen={this.state.isModalOpen}
							onClose={() => this.setState({ isModalOpen: false })}
						>
							<ImportForm/>
						</Modal>
					</div>
				</div>
				<div className="right-content">
					<div className="map" id="map"></div>
				</div>
			</div>
		);
	}
}