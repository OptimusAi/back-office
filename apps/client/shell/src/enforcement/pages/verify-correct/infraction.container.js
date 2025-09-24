import { connect } from 'react-redux';
import Infraction from './results/infraction/infraction';
import {
  updateInfractionImages,
  updateInfractionEvent,
  updateLicencePlate,
  updateInfraction,
  updateZone,
  setActiveImageViewer,
  setActiveImage,
  setIsEditing,
  fetchInfractionFromQueue,
} from '../../state/infractions.slice';
import { regionsSelectors, zonesSelectors } from '../../../app/state/app.slice';

export const mapStateToProps = (state) => ({
  activeInfraction: state.enforcement.infractions.activeInfraction,
  originalActiveInfraction:
    state.enforcement.infractions.originalActiveInfraction,
  regions: regionsSelectors.selectAll(state.app.regions),
  zones: zonesSelectors.selectAll(state.app.zones),
  activeImageViewer: state.enforcement.infractions.activeImageViewer,
  activeImage: state.enforcement.infractions.activeImage,
  permissions: state.permissions.permissions,
  activeZone: zonesSelectors.selectById(
    state.enforcement.infractions.zones,
    state.enforcement.infractions.activeZoneId
  ),
  infractionRequestStatus:
    state.enforcement.infractions.infractionRequestStatus,
  error: state.enforcement.infractions.error,
});

export const mapDispatchToProps = (dispatch) => ({
  onImageUpdate: async (
    id,
    index,
    enforcementPhotos,
    enforcementPhoto,
    useToEnforce
  ) => {
    dispatch(
      updateInfractionImages(
        id,
        index,
        enforcementPhotos,
        enforcementPhoto,
        useToEnforce
      )
    );
  },
  onEventUpdate: async ({ activeInfraction, event }) => {
    if (activeInfraction === null) {
      return;
    }
    dispatch(updateInfractionEvent({ activeId: activeInfraction.id, event }));
    try {
      await dispatch(updateInfraction(activeInfraction));
    } catch (error) {
      console.log(error);
    }
  },
  onLicencePlateUpdate: async ({ id, licencePlate }) => {
    dispatch(updateLicencePlate({ id, licencePlate }));
  },
  onZoneUpdate: async ({ id, zone, activeInfraction }) => {
    dispatch(updateZone({id, zone}));
    try {
      await dispatch(updateInfraction(activeInfraction));
    } catch (error) {
      console.log(error);
    }
  },
  onActiveImage: ({ isActive, index }) => {
    dispatch(setActiveImageViewer(isActive));
    dispatch(setActiveImage(index));
  },
  onEditing: (isEditing) => {
    dispatch(setIsEditing(isEditing));
  },
  onInfractionRequest: () => {
    dispatch(fetchInfractionFromQueue());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Infraction);
