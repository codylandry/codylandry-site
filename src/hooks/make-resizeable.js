import {
  useState,
  useMounted,
  useDestroyed
} from 'vue-hooks'

import Vue from 'vue'


export default function makeResizeable (opts) {
  const {
    selector,
    edge,
    barThickness = 6
  } = opts
  const edges = {
    top: 'height',
    bottom: 'height',
    left: 'width',
    right: 'width'
  }

  const cursors = { height: 'ns-resize', width: 'ew-resize' }
  const dimension = edges[edge]
  const otherDimension = dimension === 'width' ? 'height' : 'width'
  const cursor = cursors[dimension]
  const anchor = dimension === 'width' ? 'top' : 'left'

  const [ state, setState ] = useState({
    [dimension]: opts[`default${dimension}`],
    isDragging: false
  })

  const createDragbar = () => {
    const element = document.querySelector(selector)
    element.style.position = 'relative'
    const bar = document.createElement('div')
    bar.style.cursor = cursor
    bar.style.position = 'absolute'
    bar.style[anchor] = '0'
    bar.style[edge] = '0'
    bar.style[otherDimension] = '100%'
    bar.style[dimension] = `${barThickness}px`
    element.appendChild(bar)
    return bar
  }

  const getApplicableVector = (e) => {
    const { screenX: x, screenY: y } = e
    const positions = {
      top: y,
      bottom: y,
      left: x,
      right: x
    }
    return positions[edge]
  }

  const mousedownHandler = (mousedownEvent) => {
    const element = mousedownEvent.target.parentNode
    const vals = element.getBoundingClientRect()
    const initialDimension = vals[dimension]
    const initialValue = getApplicableVector(mousedownEvent)

    const mouseMoveHandler = (mousemoveEvent) => {
      const newValue = getApplicableVector(mousemoveEvent)

      const dimensionModifiers = {
        top: initialValue - newValue + initialDimension,
        bottom: newValue - initialValue + initialDimension,
        left: initialValue - newValue + initialDimension,
        right: newValue - initialValue + initialDimension
      }
      const newDimensionValue = dimensionModifiers[edge]

      setState({
        ...state,
        [dimension]: newDimensionValue,
        isDragging: true,
      })

      if (opts.onResize) {
        opts.onResize(newDimensionValue)
      } else {
        element.style[dimension] = newDimensionValue
      }
    }

    const mouseUpHandler = () => {
      document.removeEventListener('mousemove', mouseMoveHandler)
      document.removeEventListener('mouseup', mouseUpHandler)
      setState({ ...state, isDragging: false})

      if (opts.onDone) {
        opts.onDone(state[dimension])
      }
    }

    document.addEventListener('mousemove', mouseMoveHandler)
    document.addEventListener('mouseup', mouseUpHandler)
  }

  useMounted(async () => {
    await Vue.nextTick()
    const element = document.querySelector(selector)
    element.style[dimension] = state[dimension]
    const bar = createDragbar()
    setState({...state, bar})
    bar.addEventListener('mousedown', mousedownHandler)
  })

  useDestroyed(() => {
    const { bar } = state
    bar.removeEventListener(mousedownHandler)
  })
}
