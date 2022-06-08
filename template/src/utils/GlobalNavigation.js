/* eslint-disable */
// import { NavigationActions, StackActions } from 'react-navigation'

import * as React from "react";
import { CommonActions, StackActions } from "@react-navigation/native";

export interface IGlobalNavigation {
  navigate(routeName: string, params?: { [p: string]: any }): void;

  goBack(): void;
  pop(count?:number): void;

  getParam(key?: string): any;

  replace(routeName: string, params?: { [p: string]: any }): void;

  reset(routeName: string, params?: { [p: string]: any }): void;

  push(routeName: string, params?: { [p: string]: any }): void;
}

export const navigationRef: React.RefObject<any> = React.createRef();
let lastTimestamp: number = new Date().getTime();
const GlobalNavigation: IGlobalNavigation = {
  navigate(routeName: string, params: { [key: string]: any } = {}): void {
    if (new Date().getTime() - lastTimestamp > 500) {
      lastTimestamp = new Date().getTime();
      navigationRef.current.navigate(routeName, params);
    }
  },

  push(routeName: string, params: { [key: string]: any } = {}): void {
    if (new Date().getTime() - lastTimestamp > 500) {
      lastTimestamp = new Date().getTime();
      navigationRef.current?.dispatch(StackActions.push(routeName, params));
    }
  },

  reset(routeName: string, params: { [key: string]: any } = {}): void {
    navigationRef.current?.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: routeName, params }],
        }),
    );
  },

  replace(routeName: string, params: { [key: string]: any } = {}): void {
    navigationRef.current?.dispatch(StackActions.replace(routeName, params));
  },

  goBack() {
    navigationRef.current.goBack();
  },

  pop(count = 1) {
    navigationRef.current?.dispatch(StackActions.pop(count));
  },

  getParam(key?: string): any {
  const {
    index,
    routes,
  } = navigationRef.current.getRootState().routes[0].state;

  if (key) {
    return routes[index].params[key];
  }
  return routes[index].params;
},
};

export default GlobalNavigation;
