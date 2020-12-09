import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'AnonymousApiDemoWpWebPartStrings';
import AnonymousApiDemoWp from './components/AnonymousApiDemoWp';
import { IAnonymousApiDemoWpProps } from './components/IAnonymousApiDemoWpProps';

import { HttpClient, HttpClientResponse } from '@microsoft/sp-http';

export interface IAnonymousApiDemoWpWebPartProps {
  description: string;
}

export default class AnonymousApiDemoWpWebPart extends BaseClientSideWebPart<IAnonymousApiDemoWpWebPartProps> {

  public render(): void {

    this.getUserDetails()
      .then(response => {
      
      const element: React.ReactElement<IAnonymousApiDemoWpProps> = React.createElement(
        AnonymousApiDemoWp,
        {
          description: this.properties.description,
          id: response.id,
          name: response.name,
          username: response.username,
          email: response.email
        }
      );

      ReactDom.render(element, this.domElement);
      }
    );
  }

  private getUserDetails(): Promise<any> {
    return this.context.httpClient.get(
      'https://jsonplaceholder.typicode.com/users/1', HttpClient.configurations.v1
    )
    .then((response: HttpClientResponse) => {
      return response.json();
    })
    .then(jsonResponse => {
      return jsonResponse;
    }) as Promise<any>;
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
