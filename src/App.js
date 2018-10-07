import React, { Component } from "react";
import "./App.css";

import Sidebar from "./Components/Sidebar";
import axios from "axios";


class App extends Component {
  state = {
    venues: [],
    query: "",
  };

  componentDidMount() {
    this.getVenues();
  }

//Fetch venues from Foursquare
  getVenues = () => {
   let endPoint =  "https://api.foursquare.com/v2/venues/explore?";
   let parameters = {
     client_id: "[your Client ID here]",
     client_secret: "[your Client Secret here]",
      near: 'Banff',
      query: 'lake',
      v: '20182507'
    }

  axios.get(endPoint + new URLSearchParams(parameters))
    .then(response => {
      this.setState({
        venues: response.data.response.groups[0].items
          },  this.loadMap()
        );
    })
      .catch(error => {
        alert("Error: Couldn't load data from Foursquare.");
        console.log("ERROR!!" + error);
      })
  }

// Create Google Map
  initMap = () => {
    let map = new window.google.maps.Map(document.getElementById("map"), {
      center: { lat: 51.162761, lng: -115.445364  },
      zoom: 11,
    });
    // create Map InfoWindow
    let infowindow = new window.google.maps.InfoWindow();
      this.setState({ map,infowindow})

    // create markers
    let markers = this.state.venues.map(venues=> {
    let content = `${venues.venue.name}`;

      let marker = new window.google.maps.Marker({
        position: {
          lat: venues.venue.location.lat,
          lng: venues.venue.location.lng
        },
        map: map,
        id:venues.venue.name,
        animation: window.google.maps.Animation.DROP,
        title:venues.venue.name,
        address: venues.venue.location.address
      });

      // add eventlistener to markers
      marker.addListener("mouseover", () => {
        this.sideBarInfoWindow (marker, content);
        marker.setAnimation(window.google.maps.Animation.BOUNCE);
        setTimeout(function() {
          marker.setAnimation(null);
        }, 400);
      });

      marker.addListener('mouseout', function() {
        infowindow.close(map, marker)
      })
        return marker;
      });

      this.setState({ markers });
    };

    sideBarInfoWindow = (marker, content) => {
      this.state.infowindow.setContent(content);
      this.state.infowindow.open(this.state.map, marker);
      marker.setAnimation(window.google.maps.Animation.BOUNCE);
        setTimeout(function() {
          marker.setAnimation(null);
        }, 400);
}

//Load Google Map
  loadMap = () => {
    loadScript("https://maps.googleapis.com/maps/api/js?key=[your API Key here]&callback=initMap");
      window.initMap = this.initMap;
        console.log("loading map")

  };



//Search venues
  updateQuery = query => {
    this.setState({ query });
      if(query.length === 0){
        this.state.markers.forEach(marker => marker.setVisible(true))
          return true;
      } else {
        let venues = this.state.venues.filter(venue => {
          return venue.venue.name.toLowerCase().indexOf(query.toLowerCase()) > -1
      })
    venues.forEach(item => this.state.markers
      .filter(marker => marker.id !== item.venue.name)
        .map(falseMarker => falseMarker.setVisible(false)))
    venues.forEach(item => this.state.markers
      .filter(marker => marker.id === item.venue.name)
        .map(trueMarker => trueMarker.setVisible(true)))
    }
  };

  render() {
    return (
      <main className="container">

        <div id="map" role="application" aria-label="map" />

        <Sidebar
          venues={this.state.venues}
          query={this.state.query}
          markers={this.state.markers}
          updateQuery={this.updateQuery}
          sideBarInfoWindow={this.sideBarInfoWindow}
        />
      </main>
    );
  }
}

    function loadScript(url) {
      let ref = window.document.getElementsByTagName('script')[0]
      let script = window.document.createElement('script')

      script.src = url
      script.async = true;
      script.def = true;
      ref.parentNode.insertBefore(script, ref)
    }

export default App;
