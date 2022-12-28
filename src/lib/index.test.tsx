import React from 'react'
import renderer from 'react-test-renderer'
import { describe, expect, test } from 'vitest'
import PGNBoard from './index'

describe('PGNBoard', () => {
  test('PGNBoard component renders correctly', () => {
    const component = renderer.create(
      <PGNBoard />
    )

    const tree = component.toJSON()

    expect(tree).toMatchSnapshot()
  })

  test('The greetee prop works', () => {
    const component = renderer.create(
      <PGNBoard />
    )

    const tree = component.toJSON()

    expect(tree).toMatchSnapshot()
  })
})