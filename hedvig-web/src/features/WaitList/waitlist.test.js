import React from "react"
import { mount } from "enzyme"
import ReactRouterEnzymeContext from "react-router-enzyme-context"

import { WaitListComponent as WaitList } from "./index"

describe('<WaitList />', () => {
  it('Should fetch waitlist position when mounting', () => {
    const options = new ReactRouterEnzymeContext()
    const spy = jest.fn()
    mount(
      <WaitList
        fetchWaitlistPosition={spy}
        match={{params: {id: "some-uuid"}}}
      />,
      options.get()
    )

    expect(spy).toHaveBeenCalledTimes(1)
  })
})
