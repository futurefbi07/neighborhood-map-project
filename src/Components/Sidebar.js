import React, { Component } from "react";

class Sidebar extends Component {
  state = {};


  handleClick = (id,title) => {
  this.props.sideBarInfoWindow(this.props.markers[id],title);
  console.log("clicking")
}


  render() {
    // with destructuring you can do the same
    // as below but with less typing
    const { venues } = this.props;
       console.log(venues);
    return (
      <div className="sidebar">
       <form>
        <input
          className="box"
          aria-label="search field"
          type="text"
          placeholder="Search"
          value={this.props.query}
          onChange={event => this.props.updateQuery(event.target.value)}

        />
          <ul className="list">
            {venues.filter(
                filtered =>
                  filtered.venue.name
                    .toLowerCase()
                    .indexOf(this.props.query.toLowerCase()) > -1
              ).map((item, index) => {
                return (
                  <li tabIndex="0" className="list-item" key={index}
                    onClick={()=> this.handleClick(index,item.venue.name)} >
                      {item.venue.name}
                  </li>
                );
              })}
          </ul>
        </form>
      </div>
    );
  }
}
export default Sidebar;
