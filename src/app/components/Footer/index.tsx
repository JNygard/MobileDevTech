import * as React from 'react';
import * as style from './style.css';
import {
  Col,
  Grid,
  Row
} from 'react-bootstrap';

export namespace Footer {
  export interface Props {}
}

/*
Footer 
*/

export class Footer extends React.Component<Footer.Props> {
  public render() {
    return (
      <footer className={style.footer}>
        <div className="container">
          <Grid>
            <Row className="show-grid">
              <Col>
                <a className="fb-ic">
                </a>
              </Col>
              <Col>
                <a className="fb-ic">
                </a>
              </Col>
            </Row>
          </Grid>
        </div>

        <div className="footer-copyright text-center py-3">
          <b>© 2019 Copyright JNygard </b>
        </div>
      </footer>
    );
  }
}
