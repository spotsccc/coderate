import {render} from 'react-dom'
import * as React from 'react'

const element = <div>123123</div>

console.log(document.getElementById('app'))
render(element, document.getElementById('app'))
