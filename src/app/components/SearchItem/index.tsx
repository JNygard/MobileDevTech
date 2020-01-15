import * as React from 'react';
import * as style from './style.css';
import {
  Button,
  Col,
  ControlLabel,
  Form,
  FormControl,
  FormGroup,
  Grid,
  Row
} from 'react-bootstrap';
import { CategoryModel } from 'app/models/CategoryModel';
import {strings} from 'app/values/strings';

/*
Component responsible for providing interface for user to search and filter technologies. 
*/

export namespace SearchItem {
  export interface Props {
    section: number;
    categories: CategoryModel[];
    searchFilter: string;
    categoryFilter: string;
    onFilter: (categoryFilter: string, searchFilter: string) => any;
  }
}

export class SearchItem extends React.Component<SearchItem.Props> {


  public changeSearchWord(event: any){
    const { onFilter, categoryFilter } = this.props;
    onFilter(categoryFilter, event.target.value);
  }

  public changeCategory(event: any){
    const { onFilter, searchFilter } = this.props;
    onFilter(event.target.value, searchFilter);
  }

  public empty(event: any){
    const { onFilter } = this.props;
    onFilter('', '');
  }

  public render() {
    const { section, categories, searchFilter, categoryFilter} = this.props;
    // console.log("CatsFilter: ", categoryFilter)

    return (
      <div className={style.design} style={{backgroundImage: "url('/assets/sb" + section + ".jpg')"  }}>
        <h2 className={style.info}>{getTitleBySection(section)}</h2>
        <Form>
          <FormGroup controlId="formControlsSelect">
            <Grid>
              <Row className="show-grid">

                {/*Change Category*/}
                <Col className={style.searchItem} sm={6} md={4} lg={4} smOffset={0} mdOffset={0}>
                <ControlLabel>{strings.category}</ControlLabel>
                  <FormControl onChange={this.changeCategory.bind(this)} componentClass="select">
                    <option value=''>{strings.all}</option>
                    {categories.map((cat) => <option selected={categoryFilter == cat.name.toLowerCase()}
                    key={cat.id} value={cat.name}>{cat.name}</option>)}
                  </FormControl>
                </Col>

                {/*Search*/}
                <Col className={style.searchItem} sm={6} md={4} lg={4} smOffset={0} mdOffset={0}>
                <ControlLabel>{strings.search}</ControlLabel>
                    <FormControl onChange={this.changeSearchWord.bind(this)} type="text" 
                    placeholder="Search technologies" value={searchFilter}/>
                </Col>

                {/*Set Default*/}
                <Col className={style.searchItem} xs={6} sm={3} md={2} lg={2} smOffset={0} mdOffset={0}>
                  <ControlLabel>{strings.showAll}</ControlLabel> <br/>
                  <Button onClick={this.empty.bind(this)} block>{strings.reset}</Button>
                </Col>
              </Row>
            </Grid>
          </FormGroup>
        </Form>
      </div>
    );
  }
}

function getTitleBySection(section: number): string{
/*
  const titles: any = [strings.s1title,strings.s2title,strings.s3title,strings.s4title]
  return titles[section-1]
  */
  let title = "";
  switch (section) {
    case 1: {
      title = strings.s1title;
      break;
    }
    case 2: {
      title = strings.s2title;
      break;
    }
    case 3: {
      title = strings.s3title;
      break;
    }
    case 4: {
      title = strings.s4title;
      break;
    }
  }
  return title;
}