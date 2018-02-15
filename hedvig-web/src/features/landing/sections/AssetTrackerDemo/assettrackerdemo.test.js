import React from "react"
import { shallow } from "enzyme"
import toJson from "enzyme-to-json"
import AssetTrackerDemo from "./index"

describe('<AssetTrackerDemo />', () => {
  it('Should render correctly', () => {
    const component = shallow(<AssetTrackerDemo />)

    expect(toJson(component)).toMatchSnapshot()
  })
})
