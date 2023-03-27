import React from 'react' 
import "./../styles/footer-style.css"

class MapBox extends React.Component { 
    render() {
        return (
          <div>
            <iframe
              src="https://www.openstreetmap.org/export/embed.html?bbox=51.40713214874268%2C35.703197380107085%2C51.40953540802002%2C35.70465233122385&amp;layer=mapnik&amp;marker=35.70392485898455%2C51.40833377838135"
              className = "iframe"
            ></iframe>
          </div>
        );
    }
}

export default MapBox;
