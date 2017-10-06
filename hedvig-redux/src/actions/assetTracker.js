import { UPDATE_ITEM } from "./types"

export function updateItem(item) {
  return {
    type: UPDATE_ITEM,
    payload: item,
  }
}

export function getAssets() {
  return {
    type: GET_ASSETS,
    payload: {}
  }
}
