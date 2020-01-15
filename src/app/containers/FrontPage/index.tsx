import * as React from 'react';
import * as style from './style.css';
import { Col, Grid, Row, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { RouteComponentProps } from 'react-router';
import { RootState } from 'app/reducers';
import { omit } from 'app/utils';
import sectionService from 'app/services/sections';
import { SectionActions } from 'app/actions';
import { SectionModel } from 'app/models';
import blogPostService from 'app/services/blogPosts';
import { BlogPostActions } from 'app/actions';
import { BlogPostModel } from 'app/models';
import {strings} from 'app/values/strings';

/*
Frontpage providing links to different locations on the site
*/

export namespace FrontPage {
  export interface Props extends RouteComponentProps<void> {
    sections: RootState.SectionState;
    sectionActions: SectionActions;
    blogPosts: RootState.BlogPostState;
    blogPostActions: BlogPostActions;
  }
}

@connect(
  (state: RootState): Pick<FrontPage.Props, 'sections' | 'blogPosts'> => {
    return { sections: state.sections, blogPosts: state.blogPosts };
  },
  (dispatch: Dispatch): Pick<FrontPage.Props, 'sectionActions' | 'blogPostActions'> => ({
    sectionActions: bindActionCreators(omit(SectionActions, 'Type'), dispatch),
    blogPostActions: bindActionCreators(omit(BlogPostActions, 'Type'), dispatch)
  })
)
export class FrontPage extends React.Component<FrontPage.Props> {
  public static defaultProps: Partial<FrontPage.Props> = {};

  constructor(props: FrontPage.Props, context?: any) {
    super(props, context);
  }

  public async componentDidMount() {
    window.scrollTo(0, 0);
    const sects: SectionModel[] = await sectionService.getAll();
    this.props.sectionActions.initSections(sects);
    const posts: BlogPostModel[] = await blogPostService.getAll();
    this.props.blogPostActions.initPosts(posts);
  }

  public render() {
    const { sections, blogPosts } = this.props;

    return (
      <div className={style.frontPage}>
        <div className="container">
          <h1 className={style.info}> {strings.desc} </h1>

          <Grid className={style.grid}>
            <Row>
              
              {/* List elements */}
              {sections.map((element) => (
                <Col key={element.id} xs={12} sm={6} md={4} lg={3}>
                  
                  {/* Link */}
                  <Link className={style.link} to={element.href}>
                    <div className={style.listItem}>
                      
                      {/* Image */}
                      <img src={element.image} className={style.thumbnail} />

                      <Grid className={style.grid}>
                        <Row className="show-grid">
                          <Col className={style.title} xs={10} sm={10} md={10} lg={10}>
                            
                            {/* Element title */}
                            <h3>
                              <b>{element.title}</b>
                            </h3>
                          </Col>
                        </Row>

                        {/* Element description */}
                        <p>{element.intro}</p>
                      </Grid>
                    </div>
                  </Link>
                </Col>
              ))}
            </Row>
              <Row>
                <h1 className={style.blogTitle}> {strings.blogs}</h1>

                {/* List elements */}
                {blogPosts.map((element) => (
                  <Col key={element.id} xs={12} sm={6} md={4} lg={4}>
                    
                    {/* Link */}
                    <HashLink className={style.link} to={'/blog/#' + element.id}>
                      <div className={style.listItem2}>
                        
                        {/* Image */}
                        <img
                          src={'/assets/blog/' + element.id + '.jpg'}
                          className={style.thumbnail2}
                        />

                        <Grid className={style.grid}>
                          <Row className="show-grid">
                            <Col className={style.title2} xs={10} sm={10} md={10} lg={10}>
                              
                              {/* Element title */}
                              <h3>
                                <b>{element.title}</b> <Badge>{element.date}</Badge>
                              </h3>
                            </Col>
                          </Row>

                          {/* Element description */}
                          <p>{element.intro}</p>
                        </Grid>
                      </div>
                    </HashLink>
                  </Col>
                ))}
              </Row>
          </Grid>
        </div>
      </div>
    );
  }
}
