import React, { Component } from 'react';

import style from '../styles/with-layout.scss';
import { getComponentDisplayName } from '../utils/misc';
import GithubIssueListerHead from '../components/Head';

export default ({ title }) => (ComposedComponent) => {
  class WithLayout extends Component {
    static displayName = `withLayout(${getComponentDisplayName(ComposedComponent)})`;

    static async getInitialProps(ctx) {
      // Evaluate the composed component's getInitialProps()
      let composedInitialProps = {};
      if (ComposedComponent.getInitialProps) {
        composedInitialProps = await ComposedComponent.getInitialProps(ctx);
      }

      return {
        ...composedInitialProps,
      };
    }

    static propTypes = {
      // userAgent: PropTypes.string.isRequired,
    };

    render() {
      const {
        ...passThroughProps
      } = this.props;

      return (
        <div className={style.root}>
          <GithubIssueListerHead title={title} />
          <main>
            <ComposedComponent {...passThroughProps} />
          </main>
        </div>
      );
    }
  }

  return WithLayout;
};
