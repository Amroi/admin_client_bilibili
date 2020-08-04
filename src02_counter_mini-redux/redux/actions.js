/*
包含n个用来创建actions的工厂函数(即action creator)
*/
import { INCREMENT, DECREMENT } from './action-types'

/*
export function increment(number) {
	return { type: 'INCREMENT', data: number }
}
*/

// 增加的action
export const increment = number => ({ type: INCREMENT, data: number })

// 减少的action
export const decrement = number => ({ type: DECREMENT, data: number })