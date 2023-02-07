import actions from './actionType';
import { dummyMarkers } from './markers.json'

export const openMarker = ( id ) => {
  return ( dispatch, getState ) => {
    console.log('diaction <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<')
    const data = getState().ux.markers.filter((marker) => marker.id === id)
    dispatch({type:actions.openMarker, payload:data})
  }
}

export const closeMarker = ( ) => {
  return ( dispatch, getState ) => {
    dispatch({type:actions.closeMarker})
  }
}

export const mapMarkers = (markers) => {
  return ( dispatch, getState ) => {
    dispatch({type:actions.mapMarkers, payload:markers?markers:dummyMarkers})
  }
}