import React, { PropsWithChildren, ReactElement } from "react"
import { render } from "@testing-library/react"
import { Provider } from 'react-redux'
import store from "../store"
import { BrowserRouter } from 'react-router-dom'


const AllTheProviders = ({children}: PropsWithChildren<{}>) => {
    return (
        <Provider store={store}>
        <BrowserRouter>
            {children}
        </BrowserRouter>
    </Provider>
    )
  }
  
  const customRender = (ui: ReactElement, options?: any) =>
    render(ui, {wrapper: AllTheProviders, ...options})
  
  // re-export everything
  export * from '@testing-library/react'
  
  // override render method
  export {customRender as render}