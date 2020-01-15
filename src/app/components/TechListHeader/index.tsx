import * as React from 'react';
import * as style from './style.css';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { RootState } from 'app/reducers';
import { omit } from 'app/utils';
import {
  DropdownButton,
  MenuItem,
  ButtonToolbar,
  ToggleButton,
  ToggleButtonGroup,
  Table
} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTh, faList, faSortAlphaUp } from '@fortawesome/free-solid-svg-icons';
library.add(faTh, faList, faSortAlphaUp);
import { UIactions } from 'app/actions';
import {strings} from 'app/values/strings';


/*
Component responsible for providing UI to sort and change the way items are listed
*/

export namespace TechListHeader {
  export interface Props {
    techs: number;
    sortOptions: string[];
    viewSelection: number;
    UIactions?: UIactions;
  }
}

@connect((state: RootState, ownProps): Pick<TechListHeader.Props, 'techs'> => { return { techs: ownProps.techs } },
  (dispatch: Dispatch): Pick<TechListHeader.Props, 'UIactions'> => ({
    UIactions: bindActionCreators(omit(UIactions, 'Type'), dispatch),
  })
)
export class TechListHeader extends React.Component<TechListHeader.Props> {
  public listViewButtonListener(event: any) {
    if (event.target.value) {
      // console.log('LVIEW', event.target.value);
      this.props.UIactions!!.setListView(event.target.value);
    }
  }

  public render() {
    const { techs, sortOptions, viewSelection } = this.props;
    return (
      <div className="container">
        <Table className={style.searchTable}>
          <thead>
            <tr>
              <th className={style.headerStyle}>{strings.results} ({techs})</th>

              <th>
                <div className={style.dropdownitem}>
                  {/* View Buttons for view select */}
                  <div className={style.viewButton}>
                    <ButtonToolbar className={style.buttons}>
                      {/*Dropdown*/}
                      <DropdownButton id="dd" title="Sort">
                        <MenuItem href={'#order=' + sortOptions[0].toLocaleLowerCase()}>
                          <FontAwesomeIcon className={style.icon} icon="sort-alpha-up" />{' '}
                          {sortOptions[0]}
                        </MenuItem>

                        <MenuItem href={'#order=' + sortOptions[1].toLocaleLowerCase()}>
                          <FontAwesomeIcon className={style.icon} icon="list" /> {sortOptions[1]}
                        </MenuItem>
                      </DropdownButton>

                      <ToggleButtonGroup
                        type="radio"
                        name="options"
                        defaultValue={viewSelection}
                        onClick={this.listViewButtonListener.bind(this)}
                      >
                        <ToggleButton value={2}>
                          <FontAwesomeIcon className={style.icon} icon="th" /> {strings.grid}
                        </ToggleButton>
                        <ToggleButton value={1}>
                          <FontAwesomeIcon className={style.icon} icon="list" /> {strings.list}
                        </ToggleButton>
                      </ToggleButtonGroup>
                    </ButtonToolbar>
                  </div>
                </div>
              </th>
            </tr>
          </thead>
        </Table>
      </div>
    );
  }
}
