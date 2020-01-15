import * as React from 'react';
import * as style from './style.css';
import * as catstyle from '../catstyle.css';
import { Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { TechModel } from 'app/models/TechModel';
import { CategoryModel } from 'app/models/CategoryModel';
import { Badge } from 'react-bootstrap';
import { getCategoryName } from 'app/utils';
import { sections } from 'app/models/SectionModel';

/*
Component responsible for listing items
*/

export namespace TechListItem {
  export interface Props {
    techs: TechModel[];
    categories: CategoryModel[];
    section: number;
  }
}

export class TechListItem extends React.Component<TechListItem.Props> {
  constructor(props: TechListItem.Props, context?: any) {
    super(props, context);
  }

  public render() {
    const { techs, categories, section } = this.props;

    // console.log("Techs: ", techs);

    return (
      <div className="container">
        <div>
          <Table striped={false}>
            <tbody>
              {techs.map((tech) => (
                <tr key={tech.id}>
                  <td className={style.headerStyle}>
                    <Link to={'/' + sections[section - 1] + '/' + tech.id}>
                      <img
                        src={'/assets/' + tech.id + '.png'}
                        height="75"
                        className={style.center}
                      />
                    </Link>
                  </td>

                  <td>
                    <Link to={'/' + sections[section - 1] + '/' + tech.id}>
                      <h4>
                        {' '}
                        {tech.title}{' '}
                        <Badge className={catstyle['c' + tech.catId]}>
                          {getCategoryName(tech, categories)}
                        </Badge>
                      </h4>
                      <p>{tech.shortIntro}</p>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    );
  }
}
