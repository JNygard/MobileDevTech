import * as React from 'react';
import * as style from './style.css';
import * as catstyle from '../catstyle.css';
import { Col, Grid, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { TechModel } from 'app/models/TechModel';
import { sections } from 'app/models/SectionModel';
import { CategoryModel } from 'app/models/CategoryModel';
import { Badge } from 'react-bootstrap';
import { getCategoryName } from 'app/utils';

export namespace TechBoxListItem {
  export interface Props {
    techs: TechModel[];
    categories: CategoryModel[];
    section: number;
  }
}

export class TechBoxListItem extends React.Component<TechBoxListItem.Props> {
  constructor(props: TechBoxListItem.Props, context?: any) {
    super(props, context);
  }

  public render() {
    const { techs, categories, section } = this.props;

    // console.log("Techs: ", techs);

    return (
      <div className="container">
        <div>
          <Grid className={style.grid}>
            <Row>
              {/* List elements */}
              {techs.map((tech) => (
                <Col key={tech.id} xs={12} sm={4} md={3} lg={3}>
                  {/* Link */}
                  <Link className={style.link} to={'/' + sections[section - 1] + '/' + tech.id}>
                    <div className={style.listItem}>
                      {/* Image */}
                      <div className={style.thumbContainer}>
                        <img src={'/assets/' + tech.id + '.png'} className={style.thumbnail} />
                      </div>

                      <Grid className={style.grid}>
                        <Row className="show-grid">
                          <Col className={style.title} xs={10} sm={10} md={10} lg={10}>
                            
                            {/* Element title */}
                            <h3>
                              <b>{tech.title} </b>
                              <br />
                              <Badge className={catstyle['c' + tech.catId]}>
                                {getCategoryName(tech, categories)}
                              </Badge>
                            </h3>
                          </Col>
                        </Row>

                        {/* Element description */}
                        <p>{tech.shortIntro}</p>
                      </Grid>
                    </div>
                  </Link>
                </Col>
              ))}
            </Row>
          </Grid>
        </div>
      </div>
    );
  }
}
