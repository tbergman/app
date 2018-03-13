import React from "react"
import { shallow } from "enzyme"
import toJson from "enzyme-to-json"

import { ErrorBoundary } from "./ErrorBoundary"

describe('<ErrorBoundary />', () => {
  it('Should render child', () => {
    const component = shallow(
      <ErrorBoundary>
        test
      </ErrorBoundary>
    )
    expect(toJson(component)).toMatchSnapshot()
  })

  it('Should render error', () => {
    const component = shallow(
      <ErrorBoundary>
        test
      </ErrorBoundary>
    )
    component.setState({ hasError: true })
    expect(toJson(component)).toMatchSnapshot()
  })
})
