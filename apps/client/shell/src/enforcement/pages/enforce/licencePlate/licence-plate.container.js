import { connect } from 'react-redux';
import LicencePlate from './licence-plate';
import {
  enforceableInfractionsSelectors,
  updateLicencePlate,
  updateInfractionImages,
  updateInfractionBylaw,
  getInfractionBylaws,
  updateInfraction,
  updateInfractionEvent,
  processInfractions,
  selectInfractionId,
  updateZone,
  setActiveImageViewer,
  setActiveImage,
  setIsEditing,
  fetchLicencePlateFromQueue,
  licencePlateSelectors,
} from '../../../state/enforceable-infractions.slice';
import {
  regionsSelectors,
  zonesSelectors,
} from '../../../../app/state/app.slice';

export const mapStateToProps = (state) => ({
  activeLicencePlateId:
    state.enforcement.enforceableInfractions.activeLicencePlateId,
  activeLicencePlate: enforceableInfractionsSelectors.selectById(
    state.enforcement.enforceableInfractions.licencePlates,
    state.enforcement.enforceableInfractions.activeLicencePlateId
  ),
  activeInfraction: enforceableInfractionsSelectors.selectById(
    state.enforcement.enforceableInfractions,
    state.enforcement.enforceableInfractions.activeInfractionId
  ),
  regions: regionsSelectors.selectAll(state.app.regions),
  zones: zonesSelectors.selectAll(state.app.zones),
  availableBylaws: state.enforcement.enforceableInfractions.availableBylaws,
  licencePlateInfractions: enforceableInfractionsSelectors.selectAll(
    state.enforcement.enforceableInfractions
  ),
  activeImageViewer: state.enforcement.enforceableInfractions.activeImageViewer,
  activeImage: state.enforcement.enforceableInfractions.activeImage,
  activeInfractionEvent:
    state.enforcement.enforceableInfractions.activeInfractionEvent,
  searchDate: state.enforcement.enforceableInfractions.searchDate,
  permissions: state.permissions.permissions,
  plateRequestStatus:
    state.enforcement.enforceableInfractions.plateRequestStatus,
  fetchedPlate: state.enforcement.enforceableInfractions.fetchedPlate,
  licencePlates: licencePlateSelectors.selectAll(
    state.enforcement.enforceableInfractions.licencePlates,
    state.enforcement.enforceableInfractions.activeLicencePlateId
  ),
  originalActiveInfraction:
  state.enforcement.enforceableInfractions.originalActiveInfraction,
});

export const mapDispatchToProps = (dispatch) => ({
  onNextPlate: async (licencePlateInfractions) => {
    try {
      await dispatch(processInfractions(licencePlateInfractions));
    } catch (error) {
      console.log(error);
    }
  },
  onInfractionUpdate: async (id) => {
    try {
      await dispatch(updateInfraction(id));
    } catch (error) {
      console.log(error);
    }
  },
  onLicencePlateUpdate: ({ id, licencePlate }) => {
    dispatch(updateLicencePlate({ id, licencePlate }));
  },
  onZoneUpdate: ({ id, zone }) => {
    dispatch(updateZone({ id, zone }));
  },
  onImageUpdate: (
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
  onEventUpdate: (activeInfractionId, event) => {
    dispatch(updateInfractionEvent({ activeInfractionId, event }));
  },
  onBylawUpdate: ({ id, bylaw }) => {
    dispatch(updateInfractionBylaw({ id, bylaw }));
  },
  onRequestBylaws: () => {
    dispatch(getInfractionBylaws());
  },
  onInfractionSelect: (nextInfractionId) => {
    dispatch(selectInfractionId(nextInfractionId));
  },
  onActiveImage: ({ isActive, index }) => {
    dispatch(setActiveImageViewer(isActive));
    dispatch(setActiveImage(index));
  },
  onEditing: (isEditing) => {
    dispatch(setIsEditing(isEditing));
  },
  onLicencePlateRequest: (date) => {
    dispatch(fetchLicencePlateFromQueue(date));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(LicencePlate);
