import * as React from 'react';
import styles from './AnonymousApiDemoWp.module.scss';
import { IAnonymousApiDemoWpProps } from './IAnonymousApiDemoWpProps';
import { escape } from '@microsoft/sp-lodash-subset';

export default class AnonymousApiDemoWp extends React.Component<IAnonymousApiDemoWpProps, {}> {
  public render(): React.ReactElement<IAnonymousApiDemoWpProps> {
    return (
      <div className={ styles.anonymousApiDemoWp }>
        
        <span className={ styles.title }>User Details:</span>

        <div><strong>ID: </strong>{this.props.id}</div><br />
        <div><strong>Name: </strong>{this.props.name}</div><br />
        <div><strong>User Name: </strong>{this.props.username}</div><br />
        <div><strong>Email: </strong>{this.props.email}</div><br />

      </div>
    );
  }
}
