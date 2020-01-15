import * as React from 'react';
import * as style from './style.css';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { RouteComponentProps } from 'react-router';
import { RootState } from 'app/reducers';
import { omit } from 'app/utils';
import {
  TechListHeader,
  TechBoxListItem,
  TechListItem,
  SearchItem,
  SingleTechItem
} from 'app/components';
import { Route, Switch } from 'react-router';
import { TechActions } from 'app/actions';
import { CategoryActions } from 'app/actions';
import techService from 'app/services/techs';
import categoryService from 'app/services/categories';
import { TechModel } from 'app/models';
import { CategoryModel } from 'app/models';
import { sections, getSectionCode } from 'app/models/SectionModel';

/*
Container responsible for presenting section where user can view/filter/sort mobile app development technologies.
*/

let section = 0;
const sortOptions = ['Alphabetically', 'Category'];

export namespace MobTech {
  export interface Props extends RouteComponentProps<void> {
    techs: RootState.TechState;
    categories: RootState.CategoryState;
    techActions: TechActions;
    categoryActions: CategoryActions;
    categoryFilter: string;
    searchFilter: string;
    order: string;
    uiState: RootState.UIstate;
    sr: SearchItem;
    pl: TechBoxListItem;
  }
}

@connect(
  (
    state: RootState,
    ownProps
  ): Pick<
    MobTech.Props,
    'techs' | 'categories' | 'categoryFilter' | 'searchFilter' | 'order' | 'uiState'
  > => {
    const queryString = require('query-string');

    // Get order from hash params
    const order = queryString.parse(ownProps.location.hash).order;

    // Filters
    const categoryFilter = queryString.parse(ownProps.location.search).category;
    const searchFilter = queryString.parse(ownProps.location.search).tech;

    return {
      techs: state.techs,
      categories: state.categories,
      categoryFilter,
      searchFilter,
      order,
      uiState: state.ui
    };
  },
  (dispatch: Dispatch): Pick<MobTech.Props, 'techActions' | 'categoryActions'> => ({
    techActions: bindActionCreators(omit(TechActions, 'Type'), dispatch),
    categoryActions: bindActionCreators(omit(CategoryActions, 'Type'), dispatch)
  })
)
export class MobTech extends React.Component<MobTech.Props> {
  public static defaultProps: Partial<MobTech.Props> = {
    categoryFilter: '',
    searchFilter: '',
    order: ''
  };

  // Constructor
  constructor(props: MobTech.Props, context?: any) {
    super(props, context);
    this.handleFilterChange = this.handleFilterChange.bind(this);
  }

  // componentDidMount
  public async componentDidMount() {
    window.scrollTo(0, 0);
    this.componentDidUpdate(null, null);
  }

  // componentDidUpdate
  public async componentDidUpdate(prevProps: any, prevState: any) {
    if (setSection(this.props.location.pathname)) {
      // Scroll to top
      window.scrollTo(0, 0);
      
      // Set Techs
      const techs: TechModel[] = await techService.getAll(section);
      this.props.techActions.initTechs(techs);

      // Set Categories
      const categories: CategoryModel[] = await categoryService.getAll(section);
      this.props.categoryActions.initCategories(categories);
    }
  }

  // Category Filter change
  public handleFilterChange(categoryFilter: string, searchFilter: string) {
    // Build search query
    let query = '';
    if (categoryFilter != '' || searchFilter != '') {
      query += '?';
      if (categoryFilter != '') {
        query += 'category=' + categoryFilter.toLowerCase() + '&';
      }
      if (searchFilter != '') {
        query += 'tech=' + searchFilter.toLowerCase() + '&';
      }
    }
    // Push query to url
    this.props.history.push({ pathname: '/' + sections[section - 1], search: query });
  }

  // Render
  public render() {
    const { techs, categories, categoryFilter, searchFilter, order, uiState } = this.props;
    // console.log('UISTATE: ', uiState);

    // Filtering & sorting
    let filteredTechs = categoryFiltering(categoryFilter, categories, techs);
    filteredTechs = searchFiltering(searchFilter, filteredTechs);
    filteredTechs = sorting(order, filteredTechs);

    // Single item page
    const SingleItemPage = (props: any) => {
      const id: number = props.match.params.id;
      const tech: TechModel = techs.find((tc) => tc.id == id) as TechModel;
      return <SingleTechItem tech={tech} categories={categories} />;
    };

    // Define paths for sinleitems
    const singlePaths = [
      '/' + sections[0] + '/:id',
      '/' + sections[1] + '/:id',
      '/' + sections[2] + '/:id',
      '/' + sections[3] + '/:id'
    ];

    // Define listView type
    let viewType = 1;
    if (uiState.view !== 0) {
      viewType = uiState.view;
    } else {
      if (window.innerWidth > 700) {
        viewType = 2;
      }
    }
    // console.log("---------Viewtype: ", viewType);

    // JSX element rendered
    return (
      <div className={style.app}>
        <Switch>
          <Route path={singlePaths[0]} render={SingleItemPage} />
          <Route path={singlePaths[1]} render={SingleItemPage} />
          <Route path={singlePaths[2]} render={SingleItemPage} />
          <Route path={singlePaths[3]} render={SingleItemPage} />
        </Switch>
        <SearchItem
          section={section}
          searchFilter={searchFilter}
          categoryFilter={categoryFilter}
          categories={categories}
          onFilter={this.handleFilterChange}
        />

        <TechListHeader techs={filteredTechs.length} sortOptions={sortOptions} viewSelection={viewType} />

        {/*Box view for desktop and List for mobile*/}
        {(viewType === 2) ? (
          <TechBoxListItem section={section} categories={categories} techs={filteredTechs} />
        ) : (
          <TechListItem section={section} categories={categories} techs={filteredTechs} />
        )}
      </div>
    );
  }
}

// Sorting
function sorting(sortSelection: string, filteredTechs: TechModel[]) {
  if (sortSelection != '') {
    if (sortSelection == sortOptions[0].toLowerCase()) {
      filteredTechs.sort((a, b) => {
        if (a.title < b.title) {
          return -1;
        }
        if (a.title > b.title) {
          return 1;
        }
        return 0;
      });
    } else if (sortSelection == sortOptions[1].toLowerCase()) {
      filteredTechs.sort((a, b) => a.catId - b.catId);
    }
  }
  return filteredTechs;
}

// Filter techs with searchFilter
function searchFiltering(searchFilter: string, techs: TechModel[]): TechModel[] {
  let filteredTechs = techs;
  if (searchFilter != '') {
    filteredTechs = filteredTechs.filter((tech) => tech.title.toLowerCase().includes(searchFilter));
  }
  return filteredTechs;
}

// Filter techs with categoryFilter
function categoryFiltering(
  categoryFilter: string,
  categories: CategoryModel[],
  techs: TechModel[]
): TechModel[] {
  let filteredTechs = techs;

  if (categoryFilter != '' && categoryFilter != 'all' && categories != null && techs != null) {
    const category: any = categories.find(
      (cat: CategoryModel) => cat.name.toLocaleLowerCase() === categoryFilter.toLocaleLowerCase()
    );
    if (category != null) {
      filteredTechs = techs.filter((tech) => tech.catId == category.id);
    }
  }
  return filteredTechs;
}

// Set section by pathname
function setSection(path: string): boolean {
  // console.log('Section set ', path);
  const oldSection = section;
  section = getSectionCode(path);
  return oldSection !== section;
}
