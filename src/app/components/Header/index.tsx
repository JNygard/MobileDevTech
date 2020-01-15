import * as React from 'react';
import { Nav, Navbar, NavItem } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import * as style from './style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faInfoCircle,
  faSearch,
  faBlog,
  faMobile,
  faGlobe,
  faLayerGroup,
  faMobileAlt,
  faDesktop
} from '@fortawesome/free-solid-svg-icons';
library.add(faInfoCircle, faSearch, faBlog, faMobile, faGlobe, faLayerGroup, faMobileAlt, faDesktop);
import { sections } from 'app/models/SectionModel';

/*
Component responsible for navigation bar
*/
export namespace Header {
  export interface Props {}
}

export class Header extends React.Component<Header.Props> {
  constructor(props: Header.Props, context?: any) {
    super(props, context);
  }

  public render() {
    return (
      <header>
        <Navbar className="navbar-fixed-top" inverse={true} collapseOnSelect={true}>
          <Navbar.Header>
            <Navbar.Brand>
              <NavLink className={style.brand} exact to="/" activeStyle={{ color: 'white' }}>
              {/*Brand*/}
                  <FontAwesomeIcon className={style.icon} icon="mobile-alt" /> Mobile Tech
              </NavLink>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <div>
              <Nav >
                <NavItem eventKey={1} href="#">
                  <NavLink className={style.link} exact to={"/" + sections[0]}
                  activeStyle={{ color: 'white', textDecoration: 'underline' }}>
                    <FontAwesomeIcon className={style.icon} icon="globe" /> Web
                  </NavLink>
                </NavItem>
                <NavItem eventKey={1} href="#">
                  <NavLink className={style.link} exact to={"/" + sections[1]}  
                   activeStyle={{ color: 'white', textDecoration: 'underline' }}>
                    <FontAwesomeIcon className={style.icon} icon="mobile" /> Native
                  </NavLink>
                </NavItem>
                <NavItem eventKey={1} href="#">
                  <NavLink className={style.link} exact to={"/" + sections[2]}
                   activeStyle={{ color: 'white', textDecoration: 'underline' }}>
                    <FontAwesomeIcon className={style.icon} icon="layer-group" /> Cross-Platform
                  </NavLink>
                </NavItem>
                <NavItem eventKey={1} href="#">
                  <NavLink className={style.link} exact to={"/" + sections[3]}
                   activeStyle={{ color: 'white', textDecoration: 'underline' }}>
                    <FontAwesomeIcon className={style.icon} icon="desktop" /> Misc.
                  </NavLink>
                </NavItem>
              </Nav>
              <Nav pullRight={true}>
                <NavItem eventKey={1} href="#">
                  <NavLink className={style.link} exact to="/blog"  
                   activeStyle={{ color: 'white', textDecoration: 'underline' }}>
                    <FontAwesomeIcon className={style.icon} icon="blog" /> Blog
                  </NavLink>
                </NavItem>
              </Nav>
            </div>
          </Navbar.Collapse>
        </Navbar>
      </header>
    );
  }
}
