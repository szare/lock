import React from 'react/addons';
import GlobalError from './global_error';
import SubmitButton from './submit_button';
import Header from '../header/header';
import * as l from './index';
import * as g from '../gravatar/index';

const ReactTransitionGroup = React.addons.TransitionGroup;
const ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

export default class CredentialsPane extends React.Component {
  render() {
    const { auxiliaryPane, className, lock } = this.props;

    const gravatar = l.gravatar(lock);
    const icon = l.ui.icon(lock);
    const globalError = l.globalError(lock);
    const disableSubmit = l.submitting(lock);

    let backgroundUrl, name;
    if (gravatar) {
      backgroundUrl = g.imageUrl(gravatar);
      name = g.displayName(gravatar);
    } else {
      backgroundUrl = icon;
      name = "";
    }

    return (
      <div className={className + " auth0-lock-credentials-pane"}>
        <Header name={name} backgroundUrl={backgroundUrl} logoUrl={icon}/>
        <ReactTransitionGroup>
          {globalError && <GlobalError key="global-error" message={globalError} />}
        </ReactTransitionGroup>
        <div className="auth0-lock-content">
          {this.props.children}
        </div>
        <SubmitButton disabled={disableSubmit} />
        <ReactCSSTransitionGroup transitionName="slide">
          {auxiliaryPane}
        </ReactCSSTransitionGroup>
      </div>
    );
  }
}
