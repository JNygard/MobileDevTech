import * as React from 'react';
import * as style from './style.css';
import { RouteComponentProps } from 'react-router';
import { Grid, Row, Col } from 'react-bootstrap';
import { HashLink as NavLink } from 'react-router-hash-link';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { RootState } from 'app/reducers';
import { omit } from 'app/utils';
import blogPostService from 'app/services/blogPosts';
import { BlogPostActions } from 'app/actions';
import { BlogPostModel } from 'app/models';
import {strings} from 'app/values/strings';

/*
Blog container
*/

export namespace Blog {
  export interface Props extends RouteComponentProps<void> {
    blogPosts: RootState.BlogPostState;
    blogPostActions: BlogPostActions;
  }
}

@connect(
  (state: RootState): Pick<Blog.Props, 'blogPosts'> => {
    return { blogPosts: state.blogPosts };
  },
  (dispatch: Dispatch): Pick<Blog.Props, 'blogPostActions'> => ({
    blogPostActions: bindActionCreators(omit(BlogPostActions, 'Type'), dispatch)
  })
)
export class Blog extends React.Component<Blog.Props> {
  public static defaultProps: Partial<Blog.Props> = {};

  constructor(props: Blog.Props, context?: any) {
    super(props, context);
  }

  public async componentDidMount() {
    window.scrollTo(0, 0);
    const posts: BlogPostModel[] = await blogPostService.getAll();
    this.props.blogPostActions.initPosts(posts);
  }

  public render() {
    const { blogPosts } = this.props;

    // console.log('BlogPosts: ', blogPosts);

    return (
      <div className={style.container}>
      <div className="container">
        <h1 className={style.title}>{strings.blog}</h1>
        <Grid>
          <Row>
            <Col sm={2} className={style.blogNavCol}>
              <h3>{strings.blogPosts}</h3>
              <ul className={style.postlist}>
                {blogPosts.map((post) => (
                  <li key={post.id}><b>
                    <NavLink to={'#' + post.id}> <i>{post.date}</i> <br/>{post.title}</NavLink>
                    </b>
                    <br/><br/>
                  </li>
                ))}
              </ul>
            </Col>
            <Col sm={10} className={style.blogContentCol}>
              {blogPosts.map((post) => (
                <div key={post.id} id={'' + post.id} className={style.post}>
                  <img src={'/assets/blog/' + post.id + '.jpg'} className={style.image} />
                  <div className={style.postConent}>
                    <h2>{post.title}</h2>
                    <p>
                      <i>{post.date}</i> {strings.by}} <b>{post.author}</b>
                    </p>
                    <div dangerouslySetInnerHTML={{__html: post.content}} />
                  </div>
                </div>
              ))}
            </Col>
          </Row>
        </Grid>
      </div>
      </div>
    );
  }
}
