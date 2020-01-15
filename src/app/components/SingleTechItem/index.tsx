import * as React from 'react';
import * as style from './style.css';
import * as catstyle from '../catstyle.css';
import { Button, Modal } from 'react-bootstrap';
import { TechModel } from 'app/models/TechModel';
import { CategoryModel } from 'app/models/CategoryModel';
import { Badge, Tabs, Tab, Table } from 'react-bootstrap';
import { getCategoryName } from 'app/utils';
import {strings} from 'app/values/strings';

/*
Component responsible for presenting singleItem
*/
export namespace SingleTechItem {
  export interface Props {
    tech: TechModel;
    categories: CategoryModel[];
  }
  export interface State {}
}

export class SingleTechItem extends React.Component<
  SingleTechItem.Props,
  SingleTechItem.State
> {
  public static contextTypes = {
    router: () => null 
  };
  constructor(props: SingleTechItem.Props, context?: any) {
    super(props, context);
    this.state = {};
  }

  public render() {
    const { tech, categories } = this.props;

    if (tech != null) {
      return (
        <div>
          <Modal className={style.modal} show={true} onHide={this.context.router.history.goBack}>

            {/* Header */}
            <Modal.Header>
              {/* Title */}
              <Modal.Title className={style.title}>
                <img className={style.image} src={'../assets/' + tech.id + '.png'} />
                {tech.title}
              </Modal.Title>
            </Modal.Header>

            <Modal.Body className={style.modalBody}>

              {/* Tabs */}
              <Tabs defaultActiveKey="1"  id="uncontrolled-tab-example" >

                <Tab eventKey="1" title="Information">
                  <h3 className={style.title}>{strings.description}</h3>
                    <p>{tech.description} </p>

                    <Table responsive>
                      <tbody>
                        <tr>
                          <th>{strings.category}</th>
                          <td>
                            <Badge className={catstyle['c' + tech.catId]}>
                              {getCategoryName(tech, categories)}{' '}
                            </Badge>
                          </td>
                        </tr>

                        <tr>
                          <th>{strings.developer}</th>
                          <td>{tech.developer}</td>
                        </tr>
                        <tr>
                          <th>{strings.released}</th>
                          <td>{tech.releaseYear}</td>
                        </tr>
                        <tr>
                          <th>{strings.documentation}</th>
                          <td>
                          <a href={tech.documentation}>{tech.title} {strings.documentation}</a>{' '}
                          </td>
                        </tr>
                        <tr>
                          <th>{strings.website}</th>
                          <td>
                            <a href={tech.webSite}>{tech.title} {strings.website}</a>{' '}
                          </td>
                        </tr>
                        <tr>
                          <th>{strings.license}</th>
                          <td>{tech.license}</td>
                        </tr>
                        <tr>
                          <th>{strings.progLangs}</th>
                          <td>{tech.languages}</td>
                        </tr>
                        <tr>
                          <th>{strings.devPlats}</th>
                          <td>{tech.developmentPlatforms}</td>
                        </tr>
                        <tr>
                          <th>{strings.targPlsts}</th>
                          <td>{tech.targetPlatforms}</td>
                        </tr>
                        <tr>
                          <th>{strings.price}</th>
                          <td>{tech.price}</td>
                        </tr>
                      </tbody>
                    </Table>
                    <h3 className={style.title}>{strings.prosAndCons}</h3>
                    <Table responsive >
                      <thead>
                        <tr>
                          <th  className={style.pro}>{strings.pros}</th>
                          <th className={style.con}>{strings.cons}</th>
                        </tr>
                      </thead >
                      <tbody >
                        <tr >
                          <td className={style.pro2}>{tech.pros}</td>
                          <td className={style.con2}>{tech.cons}</td>
                        </tr>
                      </tbody>
                    </Table>
                  </Tab>

                <Tab eventKey="4" title="Learn">
                    <h3 className={style.title}>{strings.learnQuick}</h3>
                    <iframe
                      width="100%"
                      height="315"
                      src={tech.video}
                      allow="fullscreen; accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                    />

                    <h3 className={style.title}>{strings.learnMore}</h3>
                    <p> {tech.learnMore}
                    </p>
                  </Tab>
              </Tabs>
            </Modal.Body>

            <Modal.Footer>
              <Button bsStyle="primary" onClick={this.context.router.history.goBack}>
              {strings.close}
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      );
    } else {
      return (
        <div>
          <p>{strings.empty}</p>
        </div>
      );
    }
  }
}
