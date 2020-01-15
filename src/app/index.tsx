import * as React from 'react';
import { Route, Switch } from 'react-router';
import * as style from './style.css';
import { MobTech } from 'app/containers/MobTech';
import { Blog } from 'app/containers/Blog';
import { FrontPage } from 'app/containers/FrontPage';
import { hot } from 'react-hot-loader';
import { Header, Footer } from 'app/components';

/*
Routing
*/

export const App = hot(module)(() => (
  <div>
    <Header />
    <div className={style.content}>
      <Switch>
        {/*web*/}
        <Route path="/web/:id?" component={MobTech} />
        <Route path="/web" component={MobTech} />

        {/*native*/}
        <Route path="/native/:id?" component={MobTech} />
        <Route path="/native" component={MobTech} />

        {/*cross-platform*/}
        <Route path="/cross-platform/:id?" component={MobTech} />
        <Route path="/cross-platform" component={MobTech} />

        {/*misc*/}
        <Route path="/miscellaneous/:id?" component={MobTech} />
        <Route path="/miscellaneous" component={MobTech} />

        {/*other*/}
        <Route path="/blog" component={Blog} />

        <Route path="/" component={FrontPage} />
      </Switch>
    </div>
    <Footer />
  </div>
));
