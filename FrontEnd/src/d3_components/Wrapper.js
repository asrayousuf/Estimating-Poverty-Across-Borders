import React, { Component } from 'react'
class Wrapper extends Component {
    render() {
        return( 
            <div className={"card" + (this.props.plain ? " card-plain" : "")}>
                <div className={"header" + (this.props.hCenter ? " text-center" : "")}>
                    <h4 className="title">{this.props.title}</h4>
                    <p className="category">{this.props.category}</p>
                </div>
                <div className={ "content" +
                    (this.props.ctAllIcons ? " all-icons" : "") +
                    (this.props.ctTableFullWidth ? " table-full-width" : "") +
                    (this.props.ctTableResponsive ? " table-responsive" : "") +
                    (this.props.ctTableUpgrade ? " table-upgrade" : "")
                    }>
                    <div>{this.props.children}</div>
                    <div className="footer">
                        {this.props.stats != null ? <hr /> : ""}
                        <div className="stats">
                            <i className={this.props.statsIcon} /> {this.props.stats}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default Wrapper;