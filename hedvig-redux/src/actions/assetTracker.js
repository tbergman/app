import { UPDATE_ITEM, DELETE_ITEM, GET_ASSETS } from "./types"

export function updateItem(item) {
  return {
    type: UPDATE_ITEM,
    payload: item
  }
}

export function deleteItem(item) {
  return {
    type: DELETE_ITEM,
    payload: item
  }
}

export function getAssets() {
  return {
    type: GET_ASSETS,
    payload: {}
  }
}
